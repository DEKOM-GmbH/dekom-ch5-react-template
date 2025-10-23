import { useState, useEffect } from "react";
import { MuteButtonType } from "../assets/variables/enums";

import { HugeiconsIcon } from "@hugeicons/react";
import {
    Mic01Icon,
    MicOff01Icon,
    VolumeHighIcon,
    VolumeOffIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@heroui/react";

function sendDigitalHigh(joinNumber: string) {
    window.CrComLib.publishEvent("boolean", joinNumber, true);
}

function sendDigitalLow(joinNumber: string) {
    window.CrComLib.publishEvent("boolean", joinNumber, false);
}

function iconDisplay(state: boolean, type: MuteButtonType) {
    if (state === true && type === MuteButtonType.MicMute)
        return <HugeiconsIcon icon={MicOff01Icon} size={32} />;
    else if (state === false && type === MuteButtonType.MicMute)
        return <HugeiconsIcon icon={Mic01Icon} size={32} />;
    else if (state === true && type === MuteButtonType.SpkMute)
        return <HugeiconsIcon icon={VolumeOffIcon} size={32} />;
    else if (state === false && type === MuteButtonType.SpkMute)
        return <HugeiconsIcon icon={VolumeHighIcon} size={32} />;
    else return;
}

interface DigitalButtonProps extends React.PropsWithChildren {
    children?: React.ReactNode;
    joinNumber: string;
    joinNumberFb?: string;
    muteType?: MuteButtonType;
    invisibleJoinNumber?: string;
    disabledJoinNumber?: string;
    debug?: boolean;
}

export function CrButton(props: DigitalButtonProps) {
    // Check optional props and handle
    const joinNumberFb =
        props.joinNumberFb !== undefined ? props.joinNumberFb : props.joinNumber;
    const muteType =
        props.muteType !== undefined ? props.muteType : MuteButtonType.None;
    const invisibleJoinNumber =
        props.invisibleJoinNumber !== undefined ? props.invisibleJoinNumber : "";
    const disabledJoinNumber =
        props.disabledJoinNumber !== undefined ? props.disabledJoinNumber : "";
    const debug = props.debug !== undefined ? props.debug : false;

    // Declare variable and its setter method with default value
    const [digitalState, setDigitalState] = useState(false);
    const [invisibleState, setInvisibleState] = useState(false);
    const [disabledState, setDisabledState] = useState(false);

    useEffect(() => {
        // Subscribe to changes from control processor
        const digitalSubscribe = window.CrComLib.subscribeState(
            "boolean",
            joinNumberFb,
            (value: boolean) => setDigitalState(value)
        );
        let invisibleSubscribe = "";
        let disabledSubscribe = "";

        // If invisibleJoinNumber or disabledJoinNumber not provided, skip subscribing
        if (props.invisibleJoinNumber == "") return;
        else
            invisibleSubscribe = window.CrComLib.subscribeState(
                "boolean",
                invisibleJoinNumber,
                (value: boolean) => setInvisibleState(value)
            );

        if (props.disabledJoinNumber == "") return;
        else
            disabledSubscribe = window.CrComLib.subscribeState(
                "boolean",
                disabledJoinNumber,
                (value: boolean) => setDisabledState(value)
            );

        // Unsubscribe when component unmounts!
        return () => {
            window.CrComLib.unsubscribeState(
                "boolean",
                joinNumberFb,
                digitalSubscribe
            );

            if (props.invisibleJoinNumber == "") return;
            else
                window.CrComLib.unsubscribeState(
                    "boolean",
                    invisibleJoinNumber,
                    invisibleSubscribe
                );

            if (props.disabledJoinNumber == "") return;
            else
                window.CrComLib.unsubscribeState(
                    "boolean",
                    disabledJoinNumber,
                    disabledSubscribe
                );
        };
    });

    if (debug) {
        console.log(
            `Button event with join number ${props.joinNumber} and program state is ${digitalState}.`
        );
    }

    return (
        <Button
            aria-label="Crestron Button"
            color={`${digitalState ? (muteType === MuteButtonType.None ? "secondary" : "danger") : "primary"}`}
            isDisabled={disabledState}
            className={`m-2 ${invisibleState ? "invisible" : ""}`}
            onPressStart={() => sendDigitalHigh(props.joinNumber)}
            onPressEnd={() => sendDigitalLow(props.joinNumber)}
        >
            {iconDisplay(digitalState, muteType)}
            {props.children}
        </Button>
    );
}
