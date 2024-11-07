import { Button, Container } from "@mui/material"
import LinkButtonComponent from "../components/ReturnButton";


import arrow from "../assets/img/breadMini.svg"
import buttonWithImageStyle from "../styles/buttonWithImageStyle";
import MyTypography from "../components/MyTyphography";
import { SayCustomMessages } from "./classes/SayCustomMessages";

import { BrailleDigitRecognizer } from "./classes/brailleDigetRecognizer";
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
    digitRecognizer: BrailleDigitRecognizer;
    player:Player;
}

const BrailleContainer = ({ messagePlayer, isStarted, /*speechEnabled, setSpeechEnabled,*/ mainRef, resultRef, necessaryRef, handleStart, digitRecognizer, player }: BrailleProps) => {
    /*const gestureHandlerRef = useRef(
        new GestureHandler(
            () => console.log("Double tap detected"),
            () => console.log("Long press detected")
        )
    );*/

    /*const handleTouchStart = () => {
        digitRecognizer.handleTouchStart();
    };

    const handleTouchEnd = () => {
        digitRecognizer.handleTouchEnd();
    };*/
    /*const handleTap = (event: React.TouchEvent<HTMLDivElement>) => {
        const touchPoint: Point = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
    
        // Вызовем метод onTap, чтобы обработать тап
        digitRecognizer.onTap(touchPoint, () => {
          // Здесь происходит ваша логика по обработке нажатия
          // Например, распознавание цифры или выполнение действия
          const digit = digitRecognizer.recognizeDigit([touchPoint]); // Или передайте другие точки, если нужно
          console.log(digit);
          //setRecognizedDigit(digit);
        });
      };
    
      const handleRelease = () => {
        // Очистить таймеры, если тап завершен
        digitRecognizer.onRelease();
      };*/
    //console.log(digitRecognizer)
    const onTap = (event: { type: 'doubleTap' | 'longTap' | 'tap'; position: { x: number; y: number } }) => {
        player.isUniqueTaped = false;
        console.log('Event type:', event.type);
        console.log('Position:', event.position);
        if (event.type === 'doubleTap') player.PlayDoubleTouch();
        if (event.type === 'longTap') player.PlayLongTouch();
        player.isUniqueTaped = true
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