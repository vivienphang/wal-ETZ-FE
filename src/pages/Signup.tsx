import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  // handle email input error message
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setUsername(event.target.value);

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setEmail(event.target.value);

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setPassword(event.target.value);

  const handleSubmitBtn: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("submit button clicked");
    const data = {
      username,
      email,
      password,
    };
    console.log("this is data:", data);
    if (username && email && password) {
      const checkEmail = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        data
      );
      console.log(checkEmail);
      navigate("/");
    }
  };

  const isError = email === "";
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        New to us? Sign up here
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              id="new-form"
              onSubmit={(event: React.FormEvent<Element>) => {
                event.preventDefault();
                console.log("Account created");
              }}
            >
              <FormControl isRequired isInvalid={isError}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter username"
                />
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter email address"
                />
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password"
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button> */}
            <Button
              form="new-form"
              colorScheme="teal"
              type="submit"
              onSubmit={handleSubmitBtn}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  // {
  //       <>
  //      <Navbar />
  // }
  // {
  /* //   <Container maxW="550px" bg="gray.400" color="white">
  //     <h1>Sign up form</h1>
  //     <Divider />
  //     <Box padding="10" maxW="md">
  //       <FormControl isRequired isInvalid={isError}>
  //         <FormLabel>Email</FormLabel>
  //         <Input type="email" value={input} onChange={handleInputChange} /> */
  // }
  //   {!isError ? (
  //   {
  /* //           <FormHelperText>
  //             Enter the email you would like to receive the newsletter on.
  //           </FormHelperText>
  //         ) : (
  //           <FormErrorMessage>Email is required.</FormErrorMessage>
  //         )}
  //         <br />
  //         <FormLabel>Password</FormLabel>
  //         <Input placeholder="Enter password" />
  //       </FormControl> */
  // }
  // {
  /* //       <br />
  //       <ButtonGroup gap="2">
  //         <Button colorScheme="teal">Submit</Button>
  //       </ButtonGroup>
  //     </Box> */
  // }
  // {
  /* //   </Container> */
  // }
  // {
  /* // </> */
  // }
}

export default Signup;
