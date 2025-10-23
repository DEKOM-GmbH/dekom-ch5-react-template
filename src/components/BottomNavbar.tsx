import { Tabs, Tab } from "@heroui/react";

export function BottomNavigationBar() {

    return (
        <div className="fixed left-0 bottom-0 w-screen bg-gray-100">
            <center>
                <Tabs className="m-4" color="secondary" aria-label="Bottom Navigation" variant="bordered">
                    <Tab key="mode" title="Mode" />
                    <Tab key="camera" title="Camera" />
                    <Tab key="audio" title="Audio" />
                    <Tab key="light" title="Lighting" />
                    <Tab key="jalousie" title="Jalousie" />
                </Tabs>
            </center>
        </div>
    );
}