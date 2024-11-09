import { Button, Container } from "@mui/material"
import LinkButtonComponent from "../components/ReturnButton";


import arrow from "../assets/img/breadMini.svg"
import buttonWithImageStyle from "../styles/buttonWithImageStyle";
import MyTypography from "../components/MyTyphography";
import { SayCustomMessages } from "./classes/SayCustomMessages";

import { useTapRecognizer } from "../hooks/useTapRecognizer";
import { Player } from "./classes/player";
import { useEffect } from "react";

interface BrailleProps {
    messagePlayer: SayCustomMessages,
    isStarted: boolean;
    //speechEnabled: boolean;
    resultRef: React.RefObject<HTMLDivElement>;
    necessaryRef?: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    //setSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    handleStart: () => void;
    player: Player;
}

const BrailleContainer = ({ messagePlayer, isStarted, /*speechEnabled, setSpeechEnabled,*/ mainRef, resultRef, necessaryRef, handleStart, player }: BrailleProps) => {

    const onTap = (event: { type: 'doubleTap' | 'longTap' | 'tap'; position: { x: number; y: number } }) => {
        console.log('Event type:', event.type);
        console.log('Position:', event.position);
        if (event.type === 'doubleTap') {
            player.PlayDoubleTouch();
            player.isDoubleTaped = true;
        }
        if (event.type === 'longTap') {
            player.PlayLongTouch();
            player.isLongTaped = true;
        }

    };

    useTapRecognizer(isStarted, player, onTap);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <Container
            disableGutters={true}
            sx={{ pt: "2vh", display: "flex", gap: "2vh", flexDirection: "column", height: "100%" }}
        >
            <div className="buttons-container">

                {!isStarted && (
                    <Button
                        role="button"
                        aria-describedby="start-button"
                        sx={{ backgroundColor: "#A8EF25", color: "black", }}
                        tabIndex={0}
                        variant="contained"
                        id="startbutton"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            handleStart();
                        }}
                    >
                        <p style={{ margin: "5px", float: "left" }} id="start-button">Начать</p>
                    </Button>
                )}
            </div>

            {isStarted && (
                <Container id="main" ref={mainRef}>
                    <div className={"numbers-container"}>
                        <Container className={"result-number-container"}>
                            <div className={"result-number"} ref={resultRef}></div>
                            <MyTypography>Распознано</MyTypography>
                        </Container>
                    </div>
                </Container>
            )}
            <Container className="footer">
            {isStarted && necessaryRef && <Container className={"necessary-number-container"}>
                <div className={"necessary-number"} ref={necessaryRef}></div>
                <MyTypography>Ожидается</MyTypography>
            </Container>}

            <LinkButtonComponent role="button" onClick={() => {
                messagePlayer.stopAllMessages();
            }
            }
                style={buttonWithImageStyle}
                classes={"back-arrow-button color-button"}
                img={arrow}
            />
            </Container>
        </Container>


    )
}

export default BrailleContainer;