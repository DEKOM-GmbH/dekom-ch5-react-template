// Uncomment the below line if you are using CH5 components.
// import '@crestron/ch5-theme/output/themes/light-theme.css' // Crestron CSS. @crestron/ch5-theme/output/themes shows the other themes that can be used.
import "./assets/css/App.css"; // Your CSS
import { useMemo } from "react";
import useWebXPanel from "./hooks/useWebXPanel";
import { CrButton } from "./components/Buttons";
import { CrSlider } from "./components/Sliders";
import { MuteButtonType } from "./assets/variables/enums";
import { CrProgressBar } from "./components/Progress";

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
      {/* Joins */}
      <p style={{ color: "white" }}>Joins</p>
      <div>
        <div>
          <CrButton joinNumber="1" disabledJoinNumber="10">
            Join 1
          </CrButton>
          <CrButton
            joinNumber="1"
            disabledJoinNumber="10"
            muteType={MuteButtonType.MicMute}
          />
        </div>
        <div>
          <CrButton joinNumber="10">Join 10</CrButton>
          <CrButton joinNumber="10" muteType={MuteButtonType.SpkMute} />
        </div>
        <div>
          <CrSlider joinNumber="1" disabledJoinNumber="1" invisibleJoinNumber="10">Mic</CrSlider>
          <CrSlider joinNumber="1" disabledJoinNumber="1" invisibleJoinNumber="10">Mic 2</CrSlider>
          <CrProgressBar joinNumber="1"/>
        </div>
      </div>
      {/* Contracts */}
      <p style={{ color: "white" }}>Contracts</p>
      <div>
        <div>
          <CrButton
            joinNumber="HomePage.DigitalEvent"
            joinNumberFb="HomePage.DigitalState"
            invisibleJoinNumber="10"
          >
            HomePage.DigitalEvent
          </CrButton>
        </div>
        <div>
          <CrSlider joinNumber="HomePage.AnalogEvent" rangeMin={0} rangeMax={100} />
        </div>
      </div>
    </>
  );
}

export default App;
