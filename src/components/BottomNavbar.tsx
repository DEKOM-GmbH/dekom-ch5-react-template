import { Tabs, Tab } from "@heroui/react";
import { useLocation } from "react-router";

export default function BottomNavigationBar() {

    const {pathname} = useLocation();

    return (
        <div className="fixed left-0 bottom-0 w-screen bg-gray-100">
            <center>
                <Tabs selectedKey={pathname} className="m-4" color="secondary" aria-label="Bottom Navigation" variant="bordered">
                    <Tab key="/" href="/" title="Mode" />
                    <Tab key="/hello" href="/hello" title="Camera" />
                    <Tab key="audio" title="Audio" />
                    <Tab key="light" title="Lighting" />
                    <Tab key="jalousie" title="Jalousie" />
                </Tabs>
            </center>
        </div>
    );
}