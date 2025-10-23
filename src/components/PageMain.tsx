import { CrButton } from "./Buttons";
import { CrSlider } from "./Sliders";
import { CrProgressBar } from "./ProgressBar";
import { MuteButtonType } from "../assets/variables/enums";
import { CrProgressCircular } from "./ProgressCircular";


export default function PageMain() {
    return (
        <>
            <div className="flex flex-row m-4">
                <div className="flex-auto" />
                <div className="flex flex-col items-center w-3xl">
                    <CrProgressBar joinNumber="1" />
                    <CrProgressCircular joinNumber="HomePage.AnalogEvent" />
                </div>
                <div className="flex-auto" />
            </div>

            <div className="flex justify-center">
                <CrButton
                    joinNumber="HomePage.DigitalEvent"
                    joinNumberFb="HomePage.DigitalState"
                    invisibleJoinNumber="10"
                >
                    Contract
                </CrButton>
            </div>

            <div className="flex justify-center m-4">
                <div className="flex flex-col items-center">
                    <CrSlider joinNumber="1" disabledJoinNumber="1" invisibleJoinNumber="10">Mic 1</CrSlider>
                    <CrButton joinNumber="1" disabledJoinNumber="10" muteType={MuteButtonType.MicMute} />
                    <CrButton joinNumber="1" disabledJoinNumber="10">Join 1</CrButton>
                </div>

                <div className="flex flex-col items-center">
                    <CrSlider joinNumber="1" disabledJoinNumber="1" invisibleJoinNumber="10">Mic 2</CrSlider>
                    <CrButton joinNumber="1" disabledJoinNumber="10" muteType={MuteButtonType.MicMute} />
                    <CrButton joinNumber="1" disabledJoinNumber="10">Join 1</CrButton>
                </div>

                <div className="flex flex-col items-center">
                    <CrSlider joinNumber="HomePage.AnalogEvent" disabledJoinNumber="10" invisibleJoinNumber="1">Speaker</CrSlider>
                    <CrButton joinNumber="10" disabledJoinNumber="1" muteType={MuteButtonType.SpkMute} />
                    <CrButton joinNumber="10" disabledJoinNumber="1">Join 10</CrButton>
                </div>
            </div>
        </>
    );
}