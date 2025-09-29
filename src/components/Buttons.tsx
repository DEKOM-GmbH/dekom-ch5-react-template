import { useState, useEffect } from 'react';

function sendDigitalEvent(joinNumber: string, value: boolean) {
    window.CrComLib.publishEvent('b', joinNumber, value);
}

function sendDigitalClick(joinNumber: string){
    sendDigitalEvent(joinNumber, true);
    sendDigitalEvent(joinNumber, false);
}

interface DigitalButtonProps {
    joinNumber: string;
    label: string;
    debug?: boolean;
}

export function Button(props:DigitalButtonProps) {
    
    //If Debug
    const debug = props.debug !== undefined ? props.debug : false;
    
    // Declare variable and its setter method with default value
    const [digitalState, setDigitalState] = useState(false);

    useEffect(() => {
        const digitalSubscribe = window.CrComLib.subscribeState('b', props.joinNumber, (value: boolean) => setDigitalState(value));
        
        // Unsubscribe when component unmounts!
        return () => {
            window.CrComLib.unsubscribeState('b', props.joinNumber, digitalSubscribe);
        }
    })

    if(debug) {
        console.log(`Button click from join number ${props.joinNumber} and program state is ${digitalState}.`);
    }
    
    return (
        <button id="digitalButton" className={digitalState ? "btnSelected" : "btn"} onClick={() => sendDigitalClick(props.joinNumber)}>{props.label}</button>
    );
}