import React from "react";
import {
  Flex,
  Box,
  Spacer,
  ButtonGroup,
  Button,
  Heading,
  Container,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Container maxW="550px" bg="gray.400" color="white">
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Chakra App</Heading>
        </Box>
        <Spacer />
        {/* <ButtonGroup gap="2">
          <Button colorScheme="teal">Sign Up</Button>
          <Button colorScheme="teal">Log in</Button>
        </ButtonGroup> */}
      </Flex>
    </Container>
  );
};

export default Navbar;
