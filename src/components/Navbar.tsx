import React from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Spacer,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Stack,
  Container,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { MdAdd, MdSettings, MdEqualizer } from "react-icons/md";

import AddRecord from "../pages/AddRecord";
import Settings from "../pages/Settings";
import Records from "../pages/Records";
import colorList from "../constants/colorList";

// eslint-disable-next-line object-curly-newline

axios.defaults.withCredentials = true;
function Navbar() {
  // For opening modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  const {
    isOpen: isRecordsOpen,
    onOpen: onRecordsOpen,
    onClose: onRecordsClose,
  } = useDisclosure();

  return (
    <Container
      display="flex"
      justifyContent="space-evenly"
      bg={colorList.component}
      mt={3}
    >
      <Flex minWidth="max-content" paddingTop={2} paddingBottom={2}>
        <Spacer />
        <Stack direction="row" spacing={4}>
          <Box
            as={MdEqualizer}
            color="gray.500"
            size="50px"
            onClick={onRecordsOpen}
          />
          <Box as={MdAdd} color="gray.500" size="50px" onClick={onOpen} />
          <Box
            as={MdSettings}
            color="gray.500"
            size="50px"
            onClick={onSettingsOpen}
          />
        </Stack>

        <Drawer
          placement="left"
          onClose={onRecordsClose}
          isOpen={isRecordsOpen}
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent bg={colorList.drawerModal}>
            <DrawerHeader borderBottomWidth="1px">Records</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <Records />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="xl">
          <DrawerOverlay />
          <DrawerContent bg={colorList.drawerModal}>
            <DrawerHeader borderBottomWidth="1px">Add New Record</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <AddRecord onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer
          placement="right"
          onClose={onSettingsClose}
          isOpen={isSettingsOpen}
          size="xs"
        >
          <DrawerOverlay />
          <DrawerContent bg={colorList.drawerModal}>
            <DrawerHeader borderBottomWidth="1px">Settings</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <Settings />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Container>
  );
}

export default Navbar;
