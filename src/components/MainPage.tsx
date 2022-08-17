import React from "react";
// import Signup from "./Signup.tsx";
import {
  Container,
  Box,
  Divider,
  ButtonGroup,
  Button,
  HStack,
} from "@chakra-ui/react";

const MainPage = () => {
  return (
    <div>
      <h1>Welcome to WALTZ!</h1>
      <HStack spacing="24px">
        <Box w="40px" h="40px" bg="yellow.200">
          1
        </Box>
        <Box w="40px" h="40px" bg="tomato">
          2
        </Box>
        <Box w="40px" h="40px" bg="pink.100">
          3
        </Box>
      </HStack>
      {/* <Container maxW="550px" bg="gray.400" color="white">
        <Box padding="10" maxW="md">
          <ButtonGroup gap="2">
            <Button colorScheme="teal">Login</Button>
          </ButtonGroup>
          <br />
          <br />
          <ButtonGroup gap="2">
            <Button colorScheme="teal">Sign up</Button>
          </ButtonGroup>
        </Box>
      </Container> */}
    </div>
  );
};

export default MainPage;
