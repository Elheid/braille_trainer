import { useNavigate } from "react-router-dom";

import styles from './mainPage.module.css'
import { navigateHandleClick } from "../../utill";


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
    const image = img ? img :"Пусто";
    const isImagePath = /^(?:(?:https?|ftp):\/\/)?(?:[a-z0-9.-]+(:[0-9]+)?\/?)*(?:[a-z0-9-]+\.[a-z0-9]{2,6}\/?)(?:[\w\-.]+)?(?:[?#].*)?$/.test(image);
    if ((typeof image === 'string') && isImagePath /*если img - путь к img */){
        imageContainer = <img src={image} alt={alt} />;
    }
    else{
        imageContainer = <h2>{image}</h2>;
    }
    return (
            <li className={classNamees} 
            style={{cursor:"pointer", position:'relative'}}
            onClick={() => {
                //window.location.reload();
                setType(typeOfRoute);
                localStorage.setItem("language", typeOfRoute);
                navigateHandleClick(false, destination, navigate)
            }}>
                    {imageContainer}
                    {renderHeader?.()}
            </li>
    );
}
export default ViewCardComponent;