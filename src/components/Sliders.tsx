import { useState, useEffect } from "react";
import { MuteButtonType } from "../assets/variables/enums";
import { Slider } from "@heroui/react";

function sendAnalogChange(joinNumber: string, value: number | number[]) {

    window.CrComLib.publishEvent("number", joinNumber, value);
}

function formatAsPercentSimple(value: number, decimalPlaces: number = 0): string {
    const percentage = (value * 100).toFixed(decimalPlaces);
    return `${percentage}%`;
}

interface AnalogSliderProps extends React.PropsWithChildren {
    joinNumber: string;
    joinNumberFb?: string;
    orientation?: "vertical" | "horizontal";
    children?: React.ReactNode;
    rangeMin?: number;
    rangeMax?: number;
    step?: number;
    muteType?: MuteButtonType;
    invisibleJoinNumber?: string;
    disabledJoinNumber?: string;
    debug?: boolean;
}

export function CrSlider(props: AnalogSliderProps) {
    // Check optional props and handle
    const orientation = props.orientation !== undefined ? props.orientation : "vertical"
    const rangeMin = props.rangeMin !== undefined ? props.rangeMin : 0;
    const rangeMax = props.rangeMax !== undefined ? props.rangeMax : 65535;
    const step = props.step !== undefined ? props.step : 1;
    const joinNumberFb =
        props.joinNumberFb !== undefined ? props.joinNumberFb : props.joinNumber;
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
            <Slider
                aria-label="Crestron Slider"
                label={props.children}
                size="lg"
                showTooltip={true}
                hideValue={true}
                minValue={rangeMin}
                maxValue={rangeMax}
                step={step}
                orientation={orientation}
                className={`m-4 ${invisibleState ? "invisible" : ""} ${disabledState ? "disabled" : ""} ${orientation === "horizontal" ? "" : "h-[348px] w-[60px]"}`}
                isDisabled={disabledState}
                value={analogState}
                getValue={(analogState) => formatAsPercentSimple(parseInt(analogState.toString()) / rangeMax)}
                getTooltipValue={(analogState) => formatAsPercentSimple(parseInt(analogState.toString()) / rangeMax)}
                onChange={(e) => sendAnalogChange(props.joinNumber, e)}
            />
            {debug === true ? analogState : ""}
        </>
    );
}
