import {  useNavigate } from "react-router-dom";

import arrowLeftSVG from "../assets/img/arrow-left-white.svg";
import { Button } from "@mui/material";
import { myFunctionWithDelay } from "./utill";
import { HTMLAttributes } from "react";
import buttonWithImageStyle from "../styles/buttonWithImageStyle";


interface ReturnButtonComponentProps extends HTMLAttributes<HTMLButtonElement> {
    img?: string;
    description?:string;
    classes?:string;
    onClick?: () => void;
}

const ReturnButtonComponent = ({img, description}: ReturnButtonComponentProps) => {
    //const arrowImg = arrowLeftSVG;
    return (
        <div style={buttonWithImageStyle} >
            <img src={img} alt="Кнопка назад" />
            <span className="button-title back-title">{description}</span>
        </div>
    );
}



const LinkButtonComponent = ({img = arrowLeftSVG, description = "Назад", classes = "return-button", onClick, ...buttonProps} : ReturnButtonComponentProps) => {
    const navigate = useNavigate();
    const destination = "/";
    const backClick = () => {
        const baseUrl = 'http://localhost:5173/';
        if (window.location.href === baseUrl && window.location.search === '') navigate(destination)
        else myFunctionWithDelay(()=>navigate(-1), 300);
    }
    return (
        <Button
            variant="contained"
            className={classes}
            sx={{
                textTransform: 'none',
                mr: "1.5vw;",
                fontWeight: "500",
                ...(buttonProps.style ||{})
            }}
            onClick={()=>{
                backClick();
                onClick?.();
                /*if (!onClick) backClick();
                else onClick();*/
            }}
        >
            <ReturnButtonComponent img={img} description={description} />
        </Button>
    );
}

export default LinkButtonComponent;