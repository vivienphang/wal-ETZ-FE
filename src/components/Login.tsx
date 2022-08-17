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
  Flex,
} from "@chakra-ui/react";

const Login = () => {
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
        </Box>
      </Container>
    </>
  );
  // }
  // return (
  //   <div>
  //     <h1>This is the Login/SignUp Page</h1>
  //     <FormControl isRequired >
  //       <FormLabel>First name</FormLabel>
  //       <Input placeholder="First name" />
  //     </FormControl>
  //   </div>
  // );
};

export default Login;
