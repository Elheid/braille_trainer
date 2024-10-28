import { Typography } from "@mui/material";
import { LearningAndStudingSimple } from "../LearningAndStudingSimple";

import squareSVG from "../../../assets/img/square.svg"

export const TrainingPage = ()=>{
    return (
        <LearningAndStudingSimple>
            <Typography>Что-то про тренировку с шрифтом брайля</Typography>

            <div className="list">
                <div className="item">
                    <img src={squareSVG}></img>
                </div>
                <div className="item">
                    <img src={squareSVG}></img>
                </div>
                <div className="item">
                    <img src={squareSVG}></img>
                </div>
                <div className="item">
                    <img src={squareSVG}></img>
                </div>
                <div className="item">
                    <img src={squareSVG}></img>
                </div>
            </div>
        </LearningAndStudingSimple>
    );
}