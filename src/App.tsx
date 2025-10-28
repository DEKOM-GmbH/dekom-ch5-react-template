// Uncomment the below line if you are using CH5 components.
// import '@crestron/ch5-theme/output/themes/light-theme.css' // Crestron CSS. @crestron/ch5-theme/output/themes shows the other themes that can be used.
import "./assets/css/App.css"; // Your CSS
import { useMemo } from "react";
import useWebXPanel from "./hooks/useWebXPanel";
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import NavigationBar from "./components/Navbar";
import BottomNavigationBar from "./components/BottomNavbar";
import PageMain from "./components/PageMain";
import { useNavigate, useHref, Routes, Route } from "react-router";
import { CrProgressBar } from "./components/ProgressBar";

// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === "development") {
  import("eruda").then(({ default: eruda }) => {
    eruda.init();
  });
}

function App() {

  const navigate = useNavigate();

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
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider />
      <NavigationBar />

      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="hello" element={<CrProgressBar joinNumber="1"/>} />
      </Routes>

      <BottomNavigationBar />
    </HeroUIProvider>
  );
}

export default App;
