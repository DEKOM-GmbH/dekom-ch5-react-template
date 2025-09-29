import { useState, useEffect } from 'react';

function sendDigital(joinNumber: string, value: boolean) {
    window.CrComLib.publishEvent('b', joinNumber, value);
}

function sendDigitalClick(joinNumber: string){
    sendDigital(joinNumber, true);
    sendDigital(joinNumber, false);
}

interface DigitalButtonProps {
    joinNumber: string;
    label: string;
}

export function Button(props:DigitalButtonProps) {
    
    // Declare variable and its setter method with default value
    const [digitalState, setDigitalState] = useState(false);

    useEffect(() => {
        const digitalSubscribe = window.CrComLib.subscribeState('b', props.joinNumber, (value: boolean) => setDigitalState(value));
        
        // Unsubscribe when component unmounts!
        return () => {
            window.CrComLib.unsubscribeState('b', props.joinNumber, digitalSubscribe);
        }
    })
    
    return (
        <button id="digitalButton" className={digitalState ? "btnSelected" : "btn"} onClick={() => sendDigitalClick(props.joinNumber)}>{props.label}</button>
    );
}