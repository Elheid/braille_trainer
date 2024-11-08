
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
        <Container sx={{height:"inherit;"}}>
            <section className={`main-menu ${styles["main-content"]} main`}>
            <MyTypography sx={{textAlign:"left", paddingTop:"5%"}} tabIndex={0}  variant="h4">Тренажер брайльского ввода</MyTypography>
            {<MyTypography className="sans-text" sx={{textAlign:"left"}} tabIndex={1}>
            Потренируйтесь перед покупкой. В этом вам поможет специальный тренажёр. Он работает на смартфонах с сенсорным дисплеем. Если вы хотите выучить цифры на Брайле, то выберите режим «Обучение». Если вы хотите потренироваться вводить цифры, то выберите режим «Тренажер»
            </MyTypography>}
            <Box className={styles["view-cards"]}>
                <ViewCardComponent
                    destination={"/learning"}
                    className={`${styles["learning"]}  ${styles["view-card"]}`} 
                    typeOfRoute="learning"
                    img={learning}
                    alt="учиться"
                    setType={setType}
                    renderHeader={() => <MyTypography sx={{color:"black"}} variant="h5">Обучение</MyTypography>}
                />

                <ViewCardComponent
                    destination={"/training"}
                    className={`${styles["training"]} ${styles["view-card"]}`}
                    typeOfRoute="training"
                    img={training}
                    alt="Тренирвать шрифт брайля"
                    setType={setType}
                    renderHeader={() => <MyTypography sx={{color:"black"}} variant="h5">Тренажер</MyTypography>}
                />
            </Box>
            </section>
        </Container>
    );
}

export default StartPage;