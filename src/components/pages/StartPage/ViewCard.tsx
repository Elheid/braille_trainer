import { useNavigate } from "react-router-dom";

import styles from './mainPage.module.css'
import { navigateHandleClick } from "../../utill";
import { Container } from "@mui/material";
import ImageButton from "../../ImageButtonComponent";

import arrow from "../../../assets/img/chevron-right.svg"
import whiteArrowButton from "../../../styles/whiteArrowButton";

interface ViewCardComponentProps {
    className: string;
    destination: string;
    img?: string;
    alt?: string;
    typeOfRoute: string;
    setType: (language: string) => void;
    renderHeader?:() => JSX.Element;
}

const ViewCardComponent = ({ className, destination, img, alt, setType, typeOfRoute, renderHeader }: ViewCardComponentProps) => {
    const navigate = useNavigate();

    const classNamees = `${styles["view-card"]} ${className}  ${styles["transition-icon"]}`; //"gestural-language" или "clear-language";
    let imageContainer: React.ReactElement | null = null;
    imageContainer = <img src={img} alt={alt} />;
    //const image = img ? img :"Пусто";
   /* const isImagePath = /^(?:(?:https?|ftp):\/\/)?(?:[a-z0-9.-]+(:[0-9]+)?\/?)*(?:[a-z0-9-]+\.[a-z0-9]{2,6}\/?)(?:[\w\-.]+)?(?:[?#].*)?$/.test(image);
    if ((typeof image === 'string') && isImagePath){
        imageContainer = <img src={image} alt={alt} />;
    }
    else{
        imageContainer = <h2>{image}</h2>;
    }*/
    return (
            <button className={classNamees} 
            role="button"
            aria-label={typeOfRoute === 'learning' ? 'Перейти в режим обучения' : 'Перейти в режим тренировки'}
            style={{cursor:"pointer", position:'relative'}}
            onClick={() => {
                //window.location.reload();
                setType(typeOfRoute);
                localStorage.setItem("language", typeOfRoute);
                navigateHandleClick(false, destination, navigate)
                
            }}>
                    <Container className={styles["card-header"]}>
                        {imageContainer}
                        <ImageButton sx={whiteArrowButton}>
                            <img src={arrow}></img>
                        </ImageButton>
                    </Container>
                    <Container className={styles["card-footer"]}>{renderHeader?.()}</Container>
            </button>
    );
}
export default ViewCardComponent;