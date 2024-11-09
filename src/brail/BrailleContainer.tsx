import { Button, Container, Grid2 } from "@mui/material"
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

        // Создаём наблюдатель для отслеживания изменений
        const observer = new MutationObserver(updateHeight);

        if (necessaryRef && isStarted) {
            // Подключаем наблюдатель к каждому из элементов
            if (resultRef.current) {
                observer.observe(resultRef.current, { childList: true, subtree: true, characterData: true });
            }
            if (necessaryRef.current) {
                observer.observe(necessaryRef.current, { childList: true, subtree: true, characterData: true });
            }

            // Обновляем высоту при монтировании
            updateHeight();
        }

        // Отключаем наблюдатель при размонтировании
        return () => observer.disconnect();
    }, [isStarted, necessaryRef, resultRef]);

    const title = necessaryRef ? "Обучение" : "Тренировка";

    const resStyle = !necessaryRef ? {
        flex:1,
        marginLeft: "auto",
        marginRight: "20%",
    } : {flex:1}
    return (

        <Container
            disableGutters={true}
            sx={{ pt: "2vh", display: "flex", gap: "2vh", flexDirection: "column", height: "100%" }}
        >
        <Container className="header">
        <MyTypography sx={{fontSize:"1.2em"}} variant="h1">{title}</MyTypography>
        {/*isStarted && necessaryRef &&
        <></>*/}
        </Container>
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

                </Container>
            )}
            <Container className="footer">

                {isStarted &&
                    <Grid2
                        className={"numbers-container"}
                        container
                        rowSpacing={6}
                        columnSpacing={{ xs: 3, sm: 3, md: 3 }}
                        sx={{ alignItems: "stretch" }}
                    >
                        <Grid2 sx={{flex:1}} size={6} className={"result-number-container glass-effect"}>
                            <div className={"result-number"} ref={resultRef}></div>
                            <MyTypography>Распознано</MyTypography>
                        </Grid2>
                        {necessaryRef &&
                            <Grid2 sx={resStyle} size={6} className={"necessary-number-container glass-effect"}>
                                <div className={"necessary-number"} ref={necessaryRef}></div>
                                <MyTypography>Ожидается</MyTypography>
                            </Grid2>}
                    </Grid2>
                }
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