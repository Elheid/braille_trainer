import { useNavigate } from "react-router-dom";

import styles from './mainPage.module.css'
import { navigateHandleClick } from "../../utill";
import { Container } from "@mui/material";
//import ImageButton from "../../ImageButtonComponent";

import arrow from "../../../assets/img/chevron-right.svg"
import whiteArrowButton from "../../../styles/whiteArrowButton";

interface ViewCardComponentProps {
    className: string;
    destination: string;
    img?: string;
    alt?: string;
    typeOfRoute: string;
    setType: (language: string) => void;
    renderHeader?: () => JSX.Element;
}

const ViewCardComponent = ({ className, destination, img, alt, setType, typeOfRoute, renderHeader }: ViewCardComponentProps) => {
    const navigate = useNavigate();

    const classNamees = `${styles["view-card"]} ${className}  ${styles["transition-icon"]}`; //"gestural-language" или "clear-language";
    let imageContainer: React.ReactElement | null = null;
    imageContainer = <img src={img} aria-hidden="true" alt={alt} />;
    return (
        <button className={classNamees}
            role="button"
            aria-label={typeOfRoute === 'learning' ? 'Перейти в режим обучения' : 'Перейти в режим тренировки'}
            style={{ cursor: "pointer", position: 'relative' }}
            onClick={() => {
                //window.location.reload();
                setType(typeOfRoute);
                localStorage.setItem("language", typeOfRoute);
                navigateHandleClick(false, destination, navigate)

            }}>
            <Container className={styles["card-header"]}>
                {imageContainer}
                { /*<ImageButton sx={whiteArrowButton}>*/}
                <div style={whiteArrowButton}>
                    <img src={arrow} aria-hidden="true" alt="Стрелка"></img>
                </div>

                { /*</ImageButton>*/}
            </Container>
            <Container className={styles["card-footer"]}>{renderHeader?.()}</Container>
        </button>
    );
}
export default ViewCardComponent;