import React, {useRef, useState } from 'react';


import useTouchHandler from '../hooks/useTouchHandler';

import BrailleContainer from './BrailleContainer';
import { TouchHandlerType } from '../enum/TouchHandlerType';
import { SayCustomMessages } from './classes/SayCustomMessages';
import { BrailleDigitRecognizer } from './classes/brailleDigetRecognizer';
import { Player } from './classes/player';



const BrailleLearningApp: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [speechEnabled, /*setSpeechEnabled*/] = useState(true);

    const mainRef = useRef<HTMLDivElement | null>(null);
    const resultRef = useRef<HTMLDivElement | null>(null);
    const necessaryRef = useRef<HTMLDivElement | null>(null);

    //const touchHandlerRef = useRef<TouchHandlerLearning | null>(null);

    const handleStart = () => {
        //setSpeechEnabled((document.getElementById('switch') as HTMLInputElement).checked);
        setIsStarted(true);
    };
    
    const messagePlayer = new SayCustomMessages();
    const player = new Player(speechEnabled, messagePlayer, TouchHandlerType.LEARNING);

    const digitRecognizer= new BrailleDigitRecognizer();


    useTouchHandler({
        isStarted, 
        speechEnabled, 
        resultRef, 
        necessaryRef, 
        mainRef, 
        typeOfTouchHandler:TouchHandlerType.LEARNING, 
        digitRecognizer,
        player})

    return (
        <BrailleContainer 
        messagePlayer={messagePlayer}
        isStarted={isStarted} 
        //speechEnabled={speechEnabled} 
        resultRef={resultRef} 
        necessaryRef={necessaryRef}
        mainRef={mainRef} 
        //setSpeechEnabled={setSpeechEnabled}
        handleStart={handleStart}
        digitRecognizer={digitRecognizer}
        player={player}
        />
    );
};

export default BrailleLearningApp;