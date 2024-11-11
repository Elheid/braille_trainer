
//import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import ViewCardComponent from "./ViewCard";

import styles from './mainPage.module.css'
import MyTypography from "../../MyTyphography";
//import { useSpeechRecognition } from "react-speech-recognition";

import learningSVG from "../../../assets/img/learning.svg"
import trainingSVG from "../../../assets/img/training.svg"
interface MainPageComponentProps {
    type?: string;
    setType: (type: string) => void;
}

/*
const checkMicrophonePermission = async () => {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true; // Доступ к микрофону предоставлен
    } catch (err) {
        console.error('Ошибка доступа к микрофону:', err);
        return false; // Ошибка или отказ в доступе
    }
};
*/

const StartPage = ({ setType }: MainPageComponentProps) => {

    //myFunctionWithDelay(()=>speakAndContinueListen(welcomeMessage), 100)

    const learning = learningSVG;
    const training = trainingSVG

    return (
        <Container sx={{
            height:"inherit;", 
            display: "flex",
            flexDirection: "column",
            }}>
            <header style={{margin:"5%"}}>
            <MyTypography tabIndex={0} sx={{textAlign:"left", paddingTop:"5%", fontSize:"1.5rem", marginBottom:"10px"}}  variant="h1">Тренажер брайльского ввода</MyTypography>
            {<MyTypography tabIndex={0} className="sans-text" sx={{textAlign:"left"}}>
            Современные сенсорные терминалы доступны для незрячих пользователей.
Они предоставляют возможность ввести ПИН-код самостоятельно с помощью брайлевского ввода, а данное приложение поможет вам научиться это делать.
Приложение работает на смартфонах с сенсорным экраном.
Чтобы научиться вводить цифры на сенсорном ПОС -терминале нажмите кнопку “Обучение”.
Если вы уже знакомы с методом ввода и хотите просто потренироваться нажмите кнопку “Тренажёр”.
            </MyTypography>}
            </header>
            <main style={{flex:1}}>
            <section className={`main-menu ${styles["main-content"]} main`}>
            <Box role="navigation" className={styles["view-cards"]}>
                <ViewCardComponent
                    destination={"/learning"}
                    className={`${styles["learning"]}  ${styles["view-card"]}`} 
                    typeOfRoute="learning"
                    img={learning}
                    alt="учиться"
                    setType={setType}
                    renderHeader={() => <div style={{color:"black", fontSize:"1.5rem"}}>Обучение</div>}
                />

                <ViewCardComponent

                    destination={"/training"}
                    className={`${styles["training"]} ${styles["view-card"]}`}
                    typeOfRoute="training"
                    img={training}
                    alt="тренироваться"
                    setType={setType} 
                    renderHeader={() => <div style={{color:"black", fontSize:"1.5rem"}}>Тренажер</div>}
                />
            </Box>
            </section>
            </main>
        </Container>
    );
}

export default StartPage;