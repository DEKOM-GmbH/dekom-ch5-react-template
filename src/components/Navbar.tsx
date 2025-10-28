import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { addToast, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Button, Image } from "@heroui/react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from "@heroui/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShutDownIcon } from "@hugeicons/core-free-icons"

import TimeOfTheDay from "./TimeOfTheDay";
import { CrButton } from "./Buttons";

function HandleShutdownConfirm(onClose: () => void) {
    window.CrComLib.publishEvent("boolean", "100", true);
    window.CrComLib.publishEvent("boolean", "100", false);
    onClose();
}

function AddToastXpanelConnected() {
    addToast({
        title: "Connected",
        description: "Established connection to Control System.",
        color: "success",
    });
}

function AddToastXpanelDisconnected() {
    addToast({
        title: "Disconnected",
        description: "Connection to Control System is lost.",
        color: "danger",
    })
}

export default function NavigationBar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [join51, setJoin51] = useState(false);
    const [join52, setJoin52] = useState(false);

    useEffect(() => {
        document.addEventListener("cipConnectedEvent", AddToastXpanelConnected)
        document.addEventListener("cipDisconnectedEvent", AddToastXpanelDisconnected)

        const navigate1Subscribe = window.CrComLib.subscribeState(
            "boolean",
            "51",
            (value: boolean) => setJoin51(value)
        )
        const navigate2Subscribe = window.CrComLib.subscribeState(
            "boolean",
            "52",
            (value: boolean) => setJoin52(value)
        );

        if (join51 && pathname != "/") navigate("/");
        if (join52 && pathname != "/hello") navigate("/hello");

        return () => {
            document.removeEventListener("cipConnectedEvent", AddToastXpanelConnected);
            document.removeEventListener("cipConnectedEvent", AddToastXpanelDisconnected);

            window.CrComLib.unsubscribeState(
                "boolean",
                "51",
                navigate1Subscribe
            )
            window.CrComLib.unsubscribeState(
                "boolean",
                "52",
                navigate2Subscribe
            )
        }
    })




    return (
        <Navbar className="bg-gray-200" maxWidth="full" isBordered>
            <NavbarBrand>
                <Image
                    alt="Company Logo"
                    src="/assets/dekom _logo_visual-solutions.png"
                    width={150}
                    radius="none"
                />
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem>
                    <p className="text-lg font-bold text-center"><TimeOfTheDay locale="en-UK" /></p>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <CrButton joinNumber="51">51</CrButton>
                    <CrButton joinNumber="52">52</CrButton>
                    <CrButton joinNumber="53">53</CrButton>
                </NavbarItem>
                <NavbarItem>
                    <Button isIconOnly color="danger" onPress={onOpen}><HugeiconsIcon icon={ShutDownIcon} /></Button>
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
                        <ModalContent>
                            {
                                (onClose) => (
                                    <>
                                        <ModalHeader className="text-lg font-bold text-center">Turn Off System?</ModalHeader>
                                        <ModalBody>
                                            <Button onPress={onClose}>Cancel</Button>
                                            <Button onPress={() => HandleShutdownConfirm(onClose)} color="danger">Turn Off</Button>
                                        </ModalBody>
                                    </>
                                )
                            }
                        </ModalContent>
                    </Modal>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}