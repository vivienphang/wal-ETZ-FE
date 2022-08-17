import React, { useState } from "react";
import Navbar from "./Navbar.tsx";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  Box,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const Signup = () => {
  // handle email input error message
  const [input, setInput] = useState("");

  const handleInputChange = (event) => setInput(event.target.value);

  const isError = input === "";

  return (
    <>
      <Navbar />
      <Container maxW="550px" bg="gray.400" color="white">
        <h1>Sign up form</h1>
        <Divider />
        <Box padding="10" maxW="md">
          <FormControl isRequired isInvalid={isError}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={input} onChange={handleInputChange} />
            {!isError ? (
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
            <br />
            <FormLabel>Password</FormLabel>
            <Input placeholder="Enter password" />
          </FormControl>
          <br />
          <ButtonGroup gap="2">
            <Button colorScheme="teal">Submit</Button>
          </ButtonGroup>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
