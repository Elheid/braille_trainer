import React, { } from 'react';
import { useMediaQuery, useTheme, Grid2, Button } from '@mui/material';
import { navigateHandleClick } from '../../utill';
import { useNavigate } from 'react-router-dom';

import styles from './mainPage.module.css'


interface ViewCardComponentProps {
    className: string;
    destination: string;
    img?: string;
    alt?: string;
    typeOfRoute: string;
    setType: (language: string) => void;
    renderHeader?: () => JSX.Element;
}


const SplitCard = ({ className, destination, img, alt, setType, typeOfRoute, renderHeader }: ViewCardComponentProps) => {


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Определяем размер экрана
    const navigate = useNavigate();

    const classNamees = `${styles["view-card"]} ${className}  ${styles["transition-icon"]}`; //"gestural-language" или "clear-language";
    let imageContainer: React.ReactElement | null = null;
    const image = img ? img :"Пусто";
    const isImagePath = /^(?:(?:https?|ftp):\/\/)?(?:[a-z0-9.-]+(:[0-9]+)?\/?)*(?:[a-z0-9-]+\.[a-z0-9]{2,6}\/?)(?:[\w\-.]+)?(?:[?#].*)?$/.test(image);
    if ((typeof image === 'string') && isImagePath){
        imageContainer = <img src={image} alt={alt} />;
    }
    else{
        imageContainer = <h2>{image}</h2>;
    }

    return (
        <Grid2
            size={6}
            className={classNamees}
            sx={{
                height: isSmallScreen ? '50vh' : '100%',
                cursor:"pointer", 
                position:'relative'
            }}
            onClick={() => {
                //window.location.reload();
                setType(typeOfRoute);
                localStorage.setItem("language", typeOfRoute);
                navigateHandleClick(false, destination, navigate)
            }}
        >
            <Button sx={{height:'100%', width:'100%'}}>
                {image !== " " && imageContainer}
                {renderHeader?.()}
            </Button>
        </Grid2>
    );
}

interface MainPageComponentProps {
    type?: string;
    setType: (type: string) => void;
}
    

const SplitScreen= ({ setType }:MainPageComponentProps) => {

    const clearImg =" "//'🎓'//📖 //✍️ //📚 //clearIndexPNG//ClearLanguage._indexImg;
    const gesturalImg = " "//'✍️'//gesturalIndexPNG//GesturalLanguage._indexImg;
    return (
        <Grid2 className={styles["view-cards"]} container spacing={2} sx={{ height: '100vh' }}>
            <SplitCard
                className={` ${styles['learning']}`}
                destination={"/learning"}
                typeOfRoute="learning"
                img={gesturalImg}
                alt="учиться"
                setType={setType}
                renderHeader={() => <h2>Изучение</h2>}
            />
            <SplitCard
                className={` ${styles['training']}`}
                destination={"/training"}
                typeOfRoute="training"
                img={clearImg}
                alt="Тренирвать шрифт брайля"
                setType={setType}
                renderHeader={() => <h2>Тренировка</h2>}
            />
        </Grid2>
    );
};

export default SplitScreen;