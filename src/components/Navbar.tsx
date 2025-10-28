import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
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

function HandleShutdownConfirm() {
    window.CrComLib.publishEvent("boolean", "100", true);
    window.CrComLib.publishEvent("boolean", "100", false);
    // How do I close modal window after sending a command??
}

export default function NavigationBar() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                    <Button isIconOnly color="danger" onPress={onOpen}><HugeiconsIcon icon={ShutDownIcon} /></Button>
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
                        <ModalContent>
                            {
                                (onClose) => (
                                    <>
                                        <ModalHeader className="text-lg font-bold text-center">Turn Off System?</ModalHeader>
                                        <ModalBody>
                                            <Button onPress={onClose}>Cancel</Button>
                                            <Button onPressStart={HandleShutdownConfirm} onPressEnd={onClose} color="danger">Turn Off</Button>
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