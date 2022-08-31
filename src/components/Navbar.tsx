import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Box,
  Spacer,
  Container,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import AddRecord from "../pages/AddRecord";
import Camera from "./Camera";
import Settings from "../pages/Settings";
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

  const navigate = useNavigate();
  const handleLogout = async () => {
    const backEndUrl = process.env.REACT_APP_BACKEND_URL;
    // if req.user exists, post logout
    console.log("LOGGING OUT");
    window.location.href = `${backEndUrl}/auth/logout`;
  };
  return (
    <Container bg="gray.400" color="white">
      <Flex minWidth="max-content" alignItems="flex-start" gap="0">
        <Box p="2">{/* <Heading size="md">Chakra App</Heading> */}</Box>
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={() => {
            navigate("/home");
          }}
        >
          Main Page
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => {
            navigate("/balanceChart");
          }}
        >
          Balance Chart
        </Button>
        <Button colorScheme="teal" onClick={handleLogout}>
          Logout
        </Button>
        <Button colorScheme="teal" onClick={onOpen}>
          +
        </Button>
        <Button colorScheme="teal" onClick={onSettingsOpen}>
          Settings
        </Button>
        <Button colorScheme="teal" onClick={onCameraOpen}>
          Camera Feed Test
        </Button>

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
