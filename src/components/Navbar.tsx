import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
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

export function NavigationBar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
            <Navbar maxWidth="full">
                <NavbarBrand>
                    <Image
                        alt="Company Logo"
                        src="/src/assets/images/dekom _logo_visual-solutions.png"
                        width={150}
                        radius="none"
                    />
                </NavbarBrand>

                <NavbarContent justify="center">
                    <p className="text-lg font-bold text-center"><TimeOfTheDay locale="en-UK" /></p>
                </NavbarContent>

                <NavbarContent justify="end">
                    <Button isIconOnly color="danger" onPress={onOpen}><HugeiconsIcon icon={ShutDownIcon} /></Button>
                    <Modal isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
                        <ModalContent>
                            {
                                (onClose) => (
                                    <>
                                    <ModalHeader className="text-lg font-bold text-center">Turn Off System?</ModalHeader>
                                    <ModalBody>
                                        <Button onPress={onClose}>Cancel</Button>
                                        <Button onPress={onClose} color="danger">Turn Off</Button>
                                    </ModalBody>
                                    </>
                                )
                            }
                        </ModalContent>
                    </Modal>
                </NavbarContent>
            </Navbar>
    );
}