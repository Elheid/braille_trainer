import React, {useRef, useState } from 'react';


import useTouchHandler from '../hooks/useTouchHandler';

import BrailleContainer from './BrailleContainer';
import { TouchHandlerType } from '../enum/TouchHandlerType';
import { SayCustomMessages } from './classes/SayCustomMessages';



const BrailleLearningApp: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [speechEnabled, setSpeechEnabled] = useState(false);

    const mainRef = useRef<HTMLDivElement | null>(null);
    const resultRef = useRef<HTMLDivElement | null>(null);
    const necessaryRef = useRef<HTMLDivElement | null>(null);

    //const touchHandlerRef = useRef<TouchHandlerLearning | null>(null);

    const handleStart = () => {
        setSpeechEnabled((document.getElementById('switch') as HTMLInputElement).checked);
        setIsStarted(true);
    };
    const messagePlayer = new SayCustomMessages();
    useTouchHandler({isStarted, speechEnabled, resultRef, necessaryRef, mainRef, typeOfTouchHandler:TouchHandlerType.LEARNING, customMessagePlayer: messagePlayer})

    return (
        <BrailleContainer 
        isStarted={isStarted} 
        speechEnabled={speechEnabled} 
        resultRef={resultRef} 
        necessaryRef={necessaryRef}
        mainRef={mainRef} 
        setSpeechEnabled={setSpeechEnabled}
        handleStart={handleStart}
        />
    );
};

export default BrailleLearningApp;