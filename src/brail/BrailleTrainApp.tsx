import React, {useRef, useState } from 'react';

import useTouchHandler from '../hooks/useTouchHandler';
import BrailleContainer from './BrailleContainer';
import { TouchHandlerType } from '../types/TouchHandlerType';
import { SayCustomMessages } from './classes/SayCustomMessages';
import { BrailleDigitRecognizer } from './classes/brailleDigetRecognizer';
import { Player } from './classes/player';


const BrailleTrainApp: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [speechEnabled, /*setSpeechEnabled*/] = useState(true);

    const mainRef = useRef<HTMLDivElement | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleStart = () => {
        //setSpeechEnabled((document.getElementById('switch') as HTMLInputElement).checked);
        setIsStarted(true);
    };


    const messagePlayer = new SayCustomMessages();

    const player = new Player(speechEnabled, messagePlayer, TouchHandlerType.TRAINING);

    const digitRecognizer= new BrailleDigitRecognizer();

    useTouchHandler({
        isStarted, 
        speechEnabled, 
        resultRef, 
        mainRef, 
        typeOfTouchHandler:TouchHandlerType.TRAINING, 
        digitRecognizer, 
        player})

    //useTouchHandler({isStarted, speechEnabled, resultRef, mainRef, typeOfTouchHandler:TouchHandlerType.TRAINING, customMessagePlayer: messagePlayer})


    return (
        <BrailleContainer 
        messagePlayer={messagePlayer}
        isStarted={isStarted} 
        //speechEnabled={speechEnabled} 
        resultRef={resultRef} 
        mainRef={mainRef} 
        //setSpeechEnabled={setSpeechEnabled}
        handleStart={handleStart}
        player={player}
        />
    );
};

export default BrailleTrainApp;
