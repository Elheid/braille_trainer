
import { useEffect, useState } from "react";
import ViewCardComponent from "./ViewCard";

import styles from './mainPage.module.css'
import { useSpeechRecognition } from "react-speech-recognition";


interface MainPageComponentProps {
    type?: string;
    setType: (type: string) => void;
}


const checkMicrophonePermission = async () => {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true; // Доступ к микрофону предоставлен
    } catch (err) {
        console.error('Ошибка доступа к микрофону:', err);
        return false; // Ошибка или отказ в доступе
    }
};


const StartPage = ({ setType }: MainPageComponentProps) => {

    //myFunctionWithDelay(()=>speakAndContinueListen(welcomeMessage), 100)

    const clearImg = " "//'🎓'//📖 //✍️ //📚 //clearIndexPNG//ClearLanguage._indexImg;
    const gesturalImg = " "//'✍️'//gesturalIndexPNG//GesturalLanguage._indexImg;

    return (
        <section className={`main-menu ${styles["main-content"]} main`}>
            <h1 className={styles["index-title"]}>Выберете маршрут/Что вы хотите делать?</h1>
            <ul className={styles["view-cards"]}>
                <ViewCardComponent
                    destination={"/learning"}
                    className={styles["learning"]}
                    typeOfRoute="learning"
                    img={gesturalImg}
                    alt="учиться"
                    setType={setType}
                    renderHeader={() => <h2>Обучение</h2>}
                />

                <ViewCardComponent
                    destination={"/training"}
                    className={styles["training"]}
                    typeOfRoute="training"
                    img={clearImg}
                    alt="Тренирвать шрифт брайля"
                    setType={setType}
                    renderHeader={() => <h2>Тренировка</h2>}
                />
            </ul>
        </section>
    );
}

export default StartPage;