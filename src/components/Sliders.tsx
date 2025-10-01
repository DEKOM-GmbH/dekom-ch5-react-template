import { useState, useEffect } from "react";
import { MuteButtonType } from "../assets/enums/enums";

function sendAnalogChange(joinNumber: string, value: number) {
    window.CrComLib.publishEvent("number", joinNumber, value);
}
interface AnalogSliderProps extends React.PropsWithChildren {
    children?: React.ReactNode;
    rangeMin?: number;
    rangeMax?: number;
    step?: number;
    joinNumber: string;
    joinNumberFb?: string;
    muteType?: MuteButtonType;
    invisibleJoinNumber?: string;
    disabledJoinNumber?: string;
    debug?: boolean;
}

export function Slider(props: AnalogSliderProps) {
    // Check optional props and handle
    const rangeMin = props.rangeMin !== undefined ? props.rangeMin : 0;
    const rangeMax = props.rangeMax !== undefined ? props.rangeMax : 65535;
    const step = props.step !== undefined ? props.step : 1;
    const joinNumberFb =
        props.joinNumberFb !== undefined ? props.joinNumberFb : props.joinNumber;
    // TODO - handle muteType later
    const muteType =
        props.muteType !== undefined ? props.muteType : MuteButtonType.None;
    const invisibleJoinNumber =
        props.invisibleJoinNumber !== undefined ? props.invisibleJoinNumber : "";
    const disabledJoinNumber =
        props.disabledJoinNumber !== undefined ? props.disabledJoinNumber : "";
    const debug = props.debug !== undefined ? props.debug : false;

    // Declare variable and its setter method with default value
    const [analogState, setAnalogState] = useState(0);
    const [invisibleState, setInvisibleState] = useState(false);
    const [disabledState, setDisabledState] = useState(false);

    useEffect(() => {
        // Subscribe to changes from control processor
        const analogSubscribe = window.CrComLib.subscribeState(
            "number",
            joinNumberFb,
            (value: number) => setAnalogState(value)
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
                "number",
                joinNumberFb,
                analogSubscribe
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
            `Slider change with join number ${props.joinNumber} and program state is ${analogState}.`
        );
    }

    return (
        <>
            {props.children}
            <input
                id="analogSlider"
                type="range"
                min={rangeMin}
                max={rangeMax}
                step={step}
                value={analogState}
                placeholder="0"
                className={`${invisibleState ? "invisible" : ""} ${disabledState ? "disabled" : ""}`}
                disabled={disabledState}
                onChange={(e) => sendAnalogChange(props.joinNumber, Number(e.target.value))}
            />
            {debug === true ? analogState : ""}
        </>
    );
}
