import { Button, Container, Typography } from "@mui/material"
import LinkButtonComponent from "../components/ReturnButton";
import buttonWithImageStyle from "../styles/buttonWithImageStyle";

interface BrailleProps {
    isStarted: boolean;
    speechEnabled: boolean;
    resultRef: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    setSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    handleStart: () => void;
}

const BrailleContainer = ({isStarted, speechEnabled, setSpeechEnabled, mainRef, resultRef, handleStart}:BrailleProps)=>{
    return (
        <Container
        disableGutters={true}
        sx={{pt:"2vh",display:"flex", flexDirection: "column", gap:"2.5vh", height:"100vh"}}
        >
            <LinkButtonComponent style={buttonWithImageStyle} classes={"color-button"}/>
            {!isStarted && (
                <Button variant="contained" id="startbutton" onClick={handleStart}>
                    Начать
                </Button>
            )}
            <Container  sx={{ display: "flex", 
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
            </Container>
            {isStarted && (
                <Container id="main" ref={mainRef}>
                    <div ref={resultRef}></div>
                </Container>
            )}
        </Container>
    )
}

export default BrailleContainer;