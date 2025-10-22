import { useState, useEffect } from "react";
import { Progress } from "@heroui/react";

interface AnalogSliderProps extends React.PropsWithChildren {
    joinNumber: string;
    children?: React.ReactNode;
    rangeMin?: number;
    rangeMax?: number;
    invisibleJoinNumber?: string;
    disabledJoinNumber?: string;
    debug?: boolean;
}

export function CrProgressBar(props: AnalogSliderProps) {
    // Check optional props and handle
    const rangeMin = props.rangeMin !== undefined ? props.rangeMin : 0;
    const rangeMax = props.rangeMax !== undefined ? props.rangeMax : 65535;
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
            props.joinNumber,
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
                props.joinNumber,
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
            `Progress bar change with join number ${props.joinNumber} and program state is ${analogState}.`
        );
    }

    return (
        <>
            <Progress
                aria-label="Crestron Progressbar"
                label={props.children}
                size="lg"
                showValueLabel={true}
                minValue={rangeMin}
                maxValue={rangeMax}
                className={`${invisibleState ? "invisible" : ""} ${disabledState ? "disabled" : ""}`}
                isDisabled={disabledState}
                value={analogState}
            />
            {debug === true ? analogState : ""}
        </>
    );
}