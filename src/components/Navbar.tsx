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
import { MdAdd, MdSettings, MdEqualizer, MdPhotoCamera } from "react-icons/md";

import AddRecord from "../pages/AddRecord";
import Camera from "./Camera";
import Settings from "../pages/Settings";
import Records from "../pages/Records";

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
  // Trying camera feed
  const {
    isOpen: isCameraOpen,
    onOpen: onCameraOpen,
    onClose: onCameraClose,
  } = useDisclosure();
  const {
    isOpen: isRecordsOpen,
    onOpen: onRecordsOpen,
    onClose: onRecordsClose,
  } = useDisclosure();

  return (
    <Container display="flex" justifyContent="space-evenly">
      <Flex minWidth="max-content" paddingTop={2} paddingBottom={2}>
        {/* <Box p="2"></Box> */}
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
            as={MdPhotoCamera}
            color="gray.500"
            size="50px"
            onClick={onCameraOpen}
          />
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
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Records</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <Records />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer
          placement="top"
          onClose={onCameraClose}
          isOpen={isCameraOpen}
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Camera Feed</DrawerHeader>
            <DrawerBody>
              <Camera />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="xl">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Add Records</DrawerHeader>
            <DrawerBody>
              <AddRecord />
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
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Settings</DrawerHeader>
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
