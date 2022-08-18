import React from "react";
// eslint-disable-next-line object-curly-newline
import { Flex, Box, Spacer, Heading, Container } from "@chakra-ui/react";

function Navbar() {
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
}

export default Navbar;
