import { useState, useEffect } from 'react';

import { HugeiconsIcon } from '@hugeicons/react'
import { Mic01Icon, MicOff01Icon } from '@hugeicons/core-free-icons';

function sendDigitalEvent(joinNumber: string, value: boolean) {
    window.CrComLib.publishEvent('boolean', joinNumber, value);
}

function sendDigitalClick(joinNumber: string){
    sendDigitalEvent(joinNumber, true);
    sendDigitalEvent(joinNumber, false);
}

interface DigitalButtonProps {
    joinNumber: string;
    joinNumberFb?: string;
    invisibleJoinNumber?: string;
    disabledJoinNumber?: string;
    label?: string;
    debug?: boolean;
}

export function Button(props:DigitalButtonProps) {
    
    // Check optional props and handle
    const joinNumberFb = props.joinNumberFb !== undefined ? props.joinNumberFb : props.joinNumber;
    const invisibleJoinNumber = props.invisibleJoinNumber !== undefined ? props.invisibleJoinNumber : '';
    const disabledJoinNumber = props.disabledJoinNumber !== undefined ? props.disabledJoinNumber : '';
    const label = props.label !== undefined ? props.label : '';
    const debug = props.debug !== undefined ? props.debug : false;
    
    // Declare variable and its setter method with default value
    const [digitalState, setDigitalState] = useState(false);
    const [invisibleState, setInvisibleState] = useState(false);
    const [disabledState, setDisabledState] = useState(false);

    useEffect(() => {
        // Subscribe to changes from control processor
        const digitalSubscribe = window.CrComLib.subscribeState('boolean', joinNumberFb, (value: boolean) => setDigitalState(value));
        let invisibleSubscribe = '';
        let disabledSubscribe = '';

        if(props.invisibleJoinNumber == '')
            return;
        else
            invisibleSubscribe = window.CrComLib.subscribeState('boolean', invisibleJoinNumber, (value: boolean) => setInvisibleState(value));

        if(props.disabledJoinNumber == '')
            return;
        else
            disabledSubscribe = window.CrComLib.subscribeState('boolean', disabledJoinNumber, (value: boolean) => setDisabledState(value));
        
        // Unsubscribe when component unmounts!
        return () => {
            window.CrComLib.unsubscribeState('boolean', joinNumberFb, digitalSubscribe);
            
            if(props.invisibleJoinNumber == '')
                return;
            else
                window.CrComLib.unsubscribeState('boolean', invisibleJoinNumber, invisibleSubscribe);

            if(props.disabledJoinNumber == '')
                return;
            else
                window.CrComLib.unsubscribeState('boolean', disabledJoinNumber, disabledSubscribe);
        }
    })

    if(debug) {
        console.log(`Button click from join number ${props.joinNumber} and program state is ${digitalState}.`);
    }
    
    return (
        <button id="digitalButton" disabled={disabledState} className={`${digitalState ? "btn selected" : "btn normal"} ${invisibleState ? "invisible" : ""} ${disabledState ? "disabled": ""}`} onClick={() => sendDigitalClick(props.joinNumber)}>
            {label}
        </button>
    );
}

export function MuteButton(props:DigitalButtonProps) {
    
    // Check optional props and handle
    const joinNumberFb = props.joinNumberFb !== undefined ? props.joinNumberFb : props.joinNumber;
    const invisibleJoinNumber = props.invisibleJoinNumber !== undefined ? props.invisibleJoinNumber : '';
    const disabledJoinNumber = props.disabledJoinNumber !== undefined ? props.disabledJoinNumber : '';
    const label = props.label !== undefined ? props.label : '';
    const debug = props.debug !== undefined ? props.debug : false;
    
    // Declare variable and its setter method with default value
    const [digitalState, setDigitalState] = useState(false);
    const [invisibleState, setInvisibleState] = useState(false);
    const [disabledState, setDisabledState] = useState(false);

    useEffect(() => {
        // Subscribe to changes from control processor
        const digitalSubscribe = window.CrComLib.subscribeState('boolean', joinNumberFb, (value: boolean) => setDigitalState(value));
        let invisibleSubscribe = '';
        let disabledSubscribe = '';

        if(props.invisibleJoinNumber == '')
            return;
        else
            invisibleSubscribe = window.CrComLib.subscribeState('boolean', invisibleJoinNumber, (value: boolean) => setInvisibleState(value));

        if(props.disabledJoinNumber == '')
            return;
        else
            disabledSubscribe = window.CrComLib.subscribeState('boolean', disabledJoinNumber, (value: boolean) => setDisabledState(value));
        
        // Unsubscribe when component unmounts!
        return () => {
            window.CrComLib.unsubscribeState('boolean', joinNumberFb, digitalSubscribe);
            
            if(props.invisibleJoinNumber == undefined)
                return;
            else
                window.CrComLib.unsubscribeState('boolean', invisibleJoinNumber, invisibleSubscribe);

            if(props.disabledJoinNumber == undefined)
                return;
            else
                window.CrComLib.unsubscribeState('boolean', disabledJoinNumber, disabledSubscribe);
        }
    })
    if(debug) {
        console.log(`Button click from join number ${props.joinNumber} and program state is ${digitalState}.`);
    }
    
    return (
        <button id="digitalButton" disabled={disabledState} className={`${digitalState ? "btn muted" : "btn normal"} ${invisibleState ? "invisible" : ""} ${disabledState ? "disabled" : ""}`} onClick={() => sendDigitalClick(props.joinNumber)}>
            <HugeiconsIcon icon={digitalState ? MicOff01Icon : Mic01Icon} />{label}
        </button>
    );
}