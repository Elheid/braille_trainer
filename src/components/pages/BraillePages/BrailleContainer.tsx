import { Box, Container, Grid2 } from "@mui/material"
import LinkButtonComponent from "../../ReturnButton";


import arrow from "../../../assets/img/breadMini.svg"//"assets/img/breadMini.svg"
import buttonWithImageStyle from "../../../styles/buttonWithImageStyle";
import MyTypography from "../../MyTyphography";
import { SayCustomMessages } from "../../../brail/classes/SayCustomMessages";

import { useTapRecognizer } from "../../../hooks/useTapRecognizer";
import { Player } from "../../../brail/classes/player";
import { useEffect, useState } from "react";
import Attempts from "../../Attempts";

//import arrowForButton from "../assets/img/chevron-right.svg"

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
        handleStart();
    }, []);


    useEffect(() => {
        const updateHeight = () => {

            if (isStarted && necessaryRef && resultRef.current && necessaryRef.current) {
                resultRef.current.style.height = "";
                necessaryRef.current.style.height = "";

                const resultHeight = resultRef.current.offsetHeight;
                const necessaryHeight = necessaryRef.current.offsetHeight;
                const minHeight = 40;
                const maxHeight = Math.max(Math.max(resultHeight, necessaryHeight), minHeight);

                resultRef.current.style.height = `${maxHeight}px`;
                necessaryRef.current.style.height = `${maxHeight}px`;
            }
        };


        const observer = new MutationObserver(updateHeight);

        if (necessaryRef && isStarted) {

            if (resultRef.current) {
                observer.observe(resultRef.current, { childList: true, subtree: true, characterData: true });
            }
            if (necessaryRef.current) {
                observer.observe(necessaryRef.current, { childList: true, subtree: true, characterData: true });
            }


            updateHeight();
        }


        return () => observer.disconnect();
    }, [isStarted, necessaryRef, resultRef]);

    const title = necessaryRef ? "Обучение" : "Тренировка";

    const resStyle = !necessaryRef ? {
        flex: 1,
        marginLeft: "auto",
        marginRight: "20%",
    } : { flex: 1 }

    const maxAttempts = 4;
    const [attempts, setAttempts] = useState<number>(maxAttempts);



    useEffect(() => {
        /*const handleIncrement = () => {
            if (attempts < maxAttempts) setAttempts(attempts + 1);
        };*/
        const handleAttemptsRecover = () => {
            setAttempts(maxAttempts);
        }

        const handleDecrement = () => {
            if (attempts > 0) setAttempts(attempts - 1);
        };
        window.addEventListener('level-end', handleAttemptsRecover);
        window.addEventListener('level-error', handleDecrement);


        return () => {
            window.removeEventListener('level-end', handleAttemptsRecover);
            window.removeEventListener('level-error', handleDecrement);
        };


    }, [attempts])


    return (

        <Container
            disableGutters={true}
            sx={{ display: "flex", gap: "2vh", flexDirection: "column", height: "100%" }}
        >
            <div className="buttons-container">

                {/*!isStarted && (
                    <Button
                        role="button"

                        sx={{ backgroundColor: "#A8EF25", color: "black", }}
                        tabIndex={0}
                        variant="contained"
                        id="startbutton"
                        onClick={() => {
                            window.scrollTo(0, 0);
                            handleStart();
                        }}
                    >
                        <p style={{ margin: "5px", float: "left" }}>Начать</p>
                        <img src={arrowForButton} aria-hidden="true" alt="Стрелка"></img>
                    </Button>
                )*/}
            </div>

            {isStarted && (
                <Container id="main" ref={mainRef}>
                    <Box className="header">
                        <MyTypography sx={{ fontSize: "1.2em", pt: "4vh" }} variant="h1">{title}</MyTypography>
                        {isStarted && necessaryRef &&
                            <div className="attempts-container">
                                <MyTypography className="sans-text" sx={{ fontSize: "1em", pt: "3vh" }}>Попытки</MyTypography>
                                <Attempts attempts={attempts} maxAttempts={maxAttempts} />
                            </div>}
                    </Box>

                    <Box
                        className="footer"
                    >
                        {isStarted &&
                            <Grid2
                                className={"numbers-container"}
                                container
                                rowSpacing={6}
                                columnSpacing={{ xs: 3, sm: 3, md: 3 }}
                                sx={{ alignItems: "stretch" }}
                            >
                                <Grid2 sx={{ flex: 1 }} size={6} className={"result-number-container glass-effect"}>
                                    <div className={"result-number"} ref={resultRef}>Распознано</div>

                                </Grid2>
                                {necessaryRef &&
                                    <Grid2 sx={resStyle} size={6} className={"necessary-number-container glass-effect"}>
                                        <div className={"necessary-number"} ref={necessaryRef}>Ожидается</div>

                                    </Grid2>}
                            </Grid2>
                        }
                    </Box>

                </Container>
            )}
            <LinkButtonComponent variant="text" 
            myOnClick={(e: React.MouseEvent) => 
                {
                    e.stopPropagation()
                    messagePlayer.stopAllMessages();
                }
            }
            onTouchStart={(e: React.TouchEvent) => {
                e.stopPropagation()
                messagePlayer.stopAllMessages();
            }}
            style={buttonWithImageStyle}
            classes={"back-arrow-button color-button"}
            img={arrow}
            />

        </Container>


    )
}

export default BrailleContainer;