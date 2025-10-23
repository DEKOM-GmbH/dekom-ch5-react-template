// Uncomment the below line if you are using CH5 components.
// import '@crestron/ch5-theme/output/themes/light-theme.css' // Crestron CSS. @crestron/ch5-theme/output/themes shows the other themes that can be used.
import "./assets/css/App.css"; // Your CSS
import { useMemo } from "react";
import useWebXPanel from "./hooks/useWebXPanel";
import { CrButton } from "./components/Buttons";
import { CrSlider } from "./components/Sliders";
import { CrProgressBar } from "./components/ProgressBar";
import { MuteButtonType } from "./assets/variables/enums";
import { CrProgressCircular } from "./components/ProgressCircular";
import { NavigationBar } from "./components/Navbar";
import { BottomNavigationBar } from "./components/BottomNavbar";

// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === "development") {
  import("eruda").then(({ default: eruda }) => {
    eruda.init();
  });
}

function App() {

  const webXPanelConfig = useMemo(
    () => ({
      ipId: "0x10",
      host: "172.28.65.197",
      roomId: "5",
      authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlZTJiOThjLTM5MzUtNDVmMy1iYTY1LTM2ODk1MTJmNTdkYyIsImx2IjoiRGVmYXVsdCBMZXZlbCIsInZlciI6IjEuMCIsImV4cGkiOiIwIn0.wSDzTgieq1SvdFldEf6RAtymvbDOOBhRlY9eqbw04Gg",
    }),
    []
  ); // Dependencies array is empty, so this object is created only once

  useWebXPanel(webXPanelConfig);

  return (
    <>
      <NavigationBar />

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

      <BottomNavigationBar />
    </>
  );
}

export default App;
