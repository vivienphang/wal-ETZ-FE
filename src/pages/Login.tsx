/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Signup from "./Signup";
import colorList from "../constants/colorList";

axios.defaults.withCredentials = true;

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/loading");
    }
  }, []);

  const submitLoginBtn: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let userData: any;
    const data = {
      loginCredentials,
      password,
    };
    console.log("data:", data);
    try {
      userData = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/logIn`,
        data
      );
    } catch (err: any) {
      console.log("login error:", err);
      return alert(err.response.data.status);
    }
    console.log("this is data", userData);
    // save id into local storage
    const { token } = userData.data;
    localStorage.setItem("token", token);
    navigate("/loading");
    return null;
  };

  const googleLogin = () => {
    console.log("button clicked");
    window.location.href = `${backEndUrl}/auth/google`;
  };

  const handleLoginCredChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setLoginCredentials(event.target.value);

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setPassword(event.target.value);

  return (
    <div>
      <div className="LoginPage">
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor={colorList.primary}
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Heading color={colorList.alternateRowColor}>AUREUS</Heading>
            <Text color={colorList.textColor}>
              Daily Budget and Expense Manager
            </Text>
            <br />
            <Box minW={{ base: "90%", md: "468px" }}>
              <form id="login-form" onSubmit={submitLoginBtn}>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor={colorList.drawerModal}
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color={colorList.textColor} />}
                      />
                      <Input
                        type="text"
                        placeholder="Email address or Username"
                        value={loginCredentials}
                        onChange={handleLoginCredChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color={colorList.textColor}
                        children={<CFaLock color={colorList.textColor} />}
                      />
                      <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    bg={colorList.buttonPrimary}
                    color={colorList.drawerModal}
                    _hover={{
                      bg: colorList.component,
                      color: colorList.textColor,
                    }}
                    _active={{
                      bg: colorList.buttonSecondary,
                      color: colorList.textColor,
                    }}
                    width="full"
                    form="login-form"
                  >
                    Sign in
                  </Button>
                  <p>or</p>
                  <Button
                    borderRadius={0}
                    variant="solid"
                    bg={colorList.buttonPrimary}
                    color={colorList.drawerModal}
                    _hover={{
                      bg: colorList.component,
                      color: colorList.textColor,
                    }}
                    _active={{
                      bg: colorList.buttonSecondary,
                      color: colorList.textColor,
                    }}
                    width="full"
                    onClick={googleLogin}
                  >
                    Sign in with Google
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            <Signup />
          </Box>
        </Flex>
      </div>
    </div>
  );
}

export default Login;
