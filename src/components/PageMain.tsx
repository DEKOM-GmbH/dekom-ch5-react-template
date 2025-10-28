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
                    <CrProgressBar joinNumber="98" />
                    <CrProgressCircular joinNumber="98" />
                </div>
                <div className="flex-auto" />
            </div>

            <div className="flex justify-center">
                <CrButton joinNumber="98" loadingJoinNumber="101">Start Progress</CrButton>
                <CrButton joinNumber="99">Hide Sliders</CrButton>
            </div>

            <div className="flex justify-center m-4">
                <div className="flex flex-col items-center">
                    <CrSlider joinNumber="1" disabledJoinNumber="1" invisibleJoinNumber="99">Mic 1</CrSlider>
                    <CrButton joinNumber="1" disabledJoinNumber="3" invisibleJoinNumber="99" muteType={MuteButtonType.MicMute} />
                    <CrButton joinNumber="1" disabledJoinNumber="3">Join 1</CrButton>
                </div>

                <div className="flex flex-col items-center">
                    <CrSlider joinNumber="2" disabledJoinNumber="2" invisibleJoinNumber="99">Mic 2</CrSlider>
                    <CrButton joinNumber="2" disabledJoinNumber="3" invisibleJoinNumber="99" muteType={MuteButtonType.MicMute} />
                    <CrButton joinNumber="2" disabledJoinNumber="3">Join 2</CrButton>
                </div>

                <div className="flex flex-col items-center">
                    <CrSlider joinNumber="3" disabledJoinNumber="3" invisibleJoinNumber="99">Speaker</CrSlider>
                    <CrButton joinNumber="3" invisibleJoinNumber="99" muteType={MuteButtonType.SpkMute} />
                    <CrButton joinNumber="3">Join 3</CrButton>
                </div>
            </div>
        </>
    );
}