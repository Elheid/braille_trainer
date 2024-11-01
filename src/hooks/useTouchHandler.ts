import { useEffect, useRef } from "react";
import { Player } from "../brail/classes/player";
import { TouchHandlerTrainer } from "../brail/classes/TouchHandlerTrainer";
import { TouchHandlerLearning } from "../brail/classes/TouchHandlerLearning";
import { TouchHandlerType } from "../enum/TouchHandlerType";


import screenReaderTrainingMP3 from "../../public/sounds/Terminal_screenreader.wav"//"../assets/sounds/Terminal_screenreader.wav"
import screenReaderLearningMP3 from "../../public//sounds/Obuch_screenreader_off.wav"

import numberOneDescribeMP3 from "../../public//sounds/numberDescription/1v1.wav"
import numberTwoDescribeMP3 from "../../public//sounds/numberDescription/2v1.wav"
import numberThreeDescribeMP3 from "../../public//sounds/numberDescription/3v1.wav"
import { SayCustomMessages } from "../brail/classes/SayCustomMessages";

const levelInstructions = [
    { levelInstruct: 'Цифра "один". Цифра 1 состоит из одной точки. Коснитесь один раз в любом месте экрана.', levelExpect: 1, mp3:numberOneDescribeMP3 },
    { levelInstruct: 'Цифра "два". Цифра 2 состоит из двух точек на одной вертикали. Коснитесь один раз в любом месте экрана и еще раз чуть ниже первого касания.', levelExpect: 2, mp3:numberTwoDescribeMP3 },
    { levelInstruct: 'Цифра "три". Цифра 3 состоит из двух точек на одной горизонтали. Коснитесь один раз в любом месте экрана и еще раз чуть правее.', levelExpect: 3, mp3:numberThreeDescribeMP3 },
    /*{ levelInstruct: 'Цифра "четыре". Цифра 4 состоит из трех точек. Точки размещены в виде уголка: коснитесь один раз в любом месте экрана, далее коснитесь чуть правее от первой точки и третий раз коснитесь чуть ниже второй точки.', levelExpect: 4 },
    { levelInstruct: 'Цифра "пять". Цифра 5 состоит из двух точек по диагонали. Коснитесь один раз в любом месте экрана и затем ниже по диагонали правее коснитесь еще раз.', levelExpect: 5 },
    { levelInstruct: 'Цифра "шесть". Цифра 6 состоит из трех точек. Точки размещены в виде уголка: коснитесь один раз в любом месте экрана, далее коснитесь чуть правее от первой точки и третий раз коснитесь чуть ниже первой точки.', levelExpect: 6 },
    { levelInstruct: 'Цифра "семь". Цифра 7 состоит из четырех точек. Точки размещены в виде углов квадрата. Коснитесь один раз в любом месте экрана, второй раз коснитесь чуть ниже первой точки. Третий раз коснитесь правее первой точки и четвертый раз коснитесь чуть ниже третей точки.', levelExpect: 7 },
    { levelInstruct: 'Цифра "восемь". Цифра 8 состоит из трех точек. Точки размещены в виде уголка: коснитесь один раз в любом месте экрана, далее коснитесь чуть ниже от первой точки и третий раз коснитесь чуть правее второй точки.', levelExpect: 8 },
    { levelInstruct: 'Цифра "девять". Цифра 9 состоит из двух точек по диагонали. Коснитесь один раз в любом месте экрана и затем ниже по диагонали левее коснитесь еще раз.', levelExpect: 9 },
    { levelInstruct: 'Цифра "ноль". Цифра 0 состоит из трех точек. Точки размещены в виде уголка: коснитесь один раз в любом месте экрана, далее коснитесь чуть ниже от первой точки и третий раз коснитесь чуть левее второй точки.', levelExpect: 0 },
     */
];



interface UseTouchHandlerProps {
    isStarted: boolean;
    speechEnabled: boolean;
    resultRef: React.RefObject<HTMLDivElement>;
    necessaryRef?: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    typeOfTouchHandler:TouchHandlerType;
    customMessagePlayer:SayCustomMessages;
}


const useTouchHandler = ({ isStarted, speechEnabled, resultRef, necessaryRef, mainRef, typeOfTouchHandler=TouchHandlerType.TRAINING, customMessagePlayer }: UseTouchHandlerProps) => {
    const isHandlerAttachedRef = useRef(false);
    const customMessagePlayerRef = useRef(customMessagePlayer);
    //const customMessagePlayer = new SayCustomMessages();
    useEffect(() => {
        if (isStarted && resultRef.current && mainRef.current) {

            // Инициализируем Player, если он не передан в пропсах
            //playerRef.current = player || new Player(speechEnabled);
            const player = new Player(speechEnabled, customMessagePlayerRef.current);
            let touchHandlerClass: TouchHandlerTrainer | TouchHandlerLearning = new TouchHandlerTrainer(player, resultRef.current);
            if (typeOfTouchHandler === TouchHandlerType.TRAINING)
                touchHandlerClass =   new TouchHandlerTrainer(player, resultRef.current);
            if (typeOfTouchHandler === TouchHandlerType.LEARNING && necessaryRef && necessaryRef.current)
                touchHandlerClass =  new TouchHandlerLearning(player, resultRef.current, necessaryRef.current,  levelInstructions);

            const touchHandler = (e: TouchEvent) => touchHandlerClass?.Handle(e);

            if (!speechEnabled){
                player.stopMessages()
            }

            if (touchHandlerClass){

                // Проверяем, добавлен ли обработчик событий
                if (!isHandlerAttachedRef.current) {
                    mainRef.current.addEventListener('touchstart', touchHandler);
                    isHandlerAttachedRef.current = true;
                }
    
                // Сообщение при запуске
                if (isStarted && speechEnabled){
                    if (touchHandlerClass instanceof TouchHandlerLearning){
                        player.SayCustomMessage(screenReaderLearningMP3)
                    }
                    else{
                        player.SayCustomMessage(screenReaderTrainingMP3)
                    }
                    // Проверка типа для вызова `startLevel()` у TouchHandlerLearning
                    if (touchHandlerClass instanceof TouchHandlerLearning) {
                        if (speechEnabled &&  isStarted)
                            touchHandlerClass.startLevel();
                    }
                }
            }

            // Удаляем обработчик при размонтировании или изменении условий
            return () => {
                if (mainRef.current && isHandlerAttachedRef.current) {
                    mainRef.current.removeEventListener('touchstart', touchHandler);
                    isHandlerAttachedRef.current = false;
                }
            };
        }
    }, [isStarted, speechEnabled, resultRef, mainRef, typeOfTouchHandler]);
};

export default useTouchHandler;
