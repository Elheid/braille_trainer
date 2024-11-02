import { Button, Container } from "@mui/material"
import LinkButtonComponent from "../components/ReturnButton";


import arrow from "../assets/img/breadMini.svg"
import buttonWithImageStyle from "../styles/buttonWithImageStyle";
import MyTypography from "../components/MyTyphography";
interface BrailleProps {
    isStarted: boolean;
    //speechEnabled: boolean;
    resultRef: React.RefObject<HTMLDivElement>;
    necessaryRef?:React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    //setSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    handleStart: () => void;
}

const BrailleContainer = ({isStarted, /*speechEnabled, setSpeechEnabled,*/ mainRef, resultRef, necessaryRef, handleStart}:BrailleProps)=>{
    return (
        <Container
        disableGutters={true}
        sx={{pt:"2vh",display:"flex", flexDirection: "column", gap:"2.5vh", height:"100vh"}}
        >
            <LinkButtonComponent style={buttonWithImageStyle} classes={"back-arrow-button color-button"} img={arrow}/>
            {!isStarted && (
                <Button variant="contained" id="startbutton" onClick={handleStart}>
                    Начать
                </Button>
            )}
            {/*<Container  sx={{ display: "flex", 
            flexDirection: "row", 
            margin:"0 auto",
            alignItems: "center;",
            justifyContent:" center; "}}>
                <input
                    type="checkbox"
                    id="switch"
                    checked={speechEnabled}
                    onChange={() => setSpeechEnabled(!speechEnabled)}
                />
                <Typography color="info">
                    Озвучивать введенные цифры встроенным синтезатором речи
                </Typography>
            </Container>*/}
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