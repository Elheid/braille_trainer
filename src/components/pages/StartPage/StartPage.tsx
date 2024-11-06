
//import { useEffect, useState } from "react";
import { Container } from "@mui/material";
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
            <MyTypography variant="h4" /*className={styles["index-title"]}*/>Тренажер брайльского ввода</MyTypography>
            {<MyTypography tabIndex={1}>
            Потренируйтесь перед покупкой. В этом вам поможет специальный тренажёр. Он работает на смартфонах с сенсорным дисплеем. Если вы хотите выучить цифры на Брайле, то выберите режим «Обучение». Если вы хотите потренироваться вводить цифры, то выберите режим «Тренажер»
            </MyTypography>}
            <ul className={styles["view-cards"]} tabIndex={2}>
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
            </ul>
            </section>
        </Container>
    );
}

export default StartPage;