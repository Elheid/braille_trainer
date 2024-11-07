import { Button, Container } from "@mui/material"
import LinkButtonComponent from "../components/ReturnButton";


import arrow from "../assets/img/breadMini.svg"
import buttonWithImageStyle from "../styles/buttonWithImageStyle";
import MyTypography from "../components/MyTyphography";
import { SayCustomMessages } from "./classes/SayCustomMessages";

import { useTapRecognizer } from "../hooks/useTapRecognizer";
import { Player } from "./classes/player";

interface BrailleProps {
    messagePlayer: SayCustomMessages,
    isStarted: boolean;
    //speechEnabled: boolean;
    resultRef: React.RefObject<HTMLDivElement>;
    necessaryRef?: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    //setSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    handleStart: () => void;
    player:Player;
}

const BrailleContainer = ({ messagePlayer, isStarted, /*speechEnabled, setSpeechEnabled,*/ mainRef, resultRef, necessaryRef, handleStart, player }: BrailleProps) => {

    const onTap = (event: { type: 'doubleTap' | 'longTap' | 'tap'; position: { x: number; y: number } }) => {
        console.log('Event type:', event.type);
        console.log('Position:', event.position);
        if (event.type === 'doubleTap'){
            player.PlayDoubleTouch();
            player.isDoubleTaped = true;
        } 
        if (event.type === 'longTap'){
            player.PlayLongTouch();
            player.isLongTaped = true;
        } 

    };

    useTapRecognizer(player, onTap);



    return (
        <Container
            disableGutters={true}
            sx={{ pt: "2vh", display: "flex", flexDirection: "column", gap: "2.5vh", height: "100vh" }}
        >
            <LinkButtonComponent tabIndex={0} onClick={() => {
                messagePlayer.stopMessages();
            }
            }
                style={buttonWithImageStyle} classes={"back-arrow-button color-button"} img={arrow} />
            {!isStarted && (
                <Button tabIndex={1} variant="contained" id="startbutton" onClick={handleStart}>
                    Начать
                </Button>
            )}

            {isStarted && (
                <Container id="main" ref={mainRef}>
                    <div className={"numbers-container"}>
                        <Container className={"result-number-container"}>
                            <div className={"result-number"} ref={resultRef}></div>
                            <MyTypography>Распознано</MyTypography>
                        </Container>
                        {necessaryRef && <Container className={"necessary-number-container"}>
                            <div className={"necessary-number"} ref={necessaryRef}></div>
                            <MyTypography>Ожидается</MyTypography>
                        </Container>}
                    </div>
                </Container>
            )}
        </Container>
    )
}

export default BrailleContainer;