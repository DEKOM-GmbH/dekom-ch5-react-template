import { Tabs, Tab } from "@heroui/react";
import { useLocation } from "react-router";

function Navigate51(){
    window.CrComLib.publishEvent("boolean", "51", true);
    window.CrComLib.publishEvent("boolean", "51", false);
}
function Navigate52(){
    window.CrComLib.publishEvent("boolean", "52", true);
    window.CrComLib.publishEvent("boolean", "52", false);
}


export default function BottomNavigationBar() {

    const {pathname} = useLocation();

    return (
        <div className="fixed left-0 bottom-0 w-screen bg-gray-100">
            <center>
                <Tabs selectedKey={pathname} className="m-4" color="secondary" aria-label="Bottom Navigation" variant="bordered">
                    <Tab key="/" title="Mode" onClick={Navigate51}/>
                    <Tab key="/hello" title="Camera" onClick={Navigate52}/>
                    <Tab key="audio" title="Audio" />
                    <Tab key="light" title="Lighting" />
                    <Tab key="jalousie" title="Jalousie" />
                </Tabs>
            </center>
        </div>
    );
}