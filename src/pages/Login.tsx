/* eslint-disable react/no-children-prop */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  // FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Signup from "./Signup";

axios.defaults.withCredentials = true;

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  // initialize states
  // const [user, setUser] = useState([]);
  // const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  const googleLogin = () => {
    console.log("button clicked");
    window.location.href = `${backEndUrl}/auth/google`;
  };

  return (
    <div>
      <div className="LoginPage">
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          backgroundColor="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Heading color="teal.400">WALTZ</Heading>
            <p>Daily Budget and Expense Manager</p>
            <br />
            <Box minW={{ base: "90%", md: "468px" }}>
              <form>
                <Stack
                  spacing={4}
                  p="1rem"
                  backgroundColor="whiteAlpha.900"
                  boxShadow="md"
                >
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input type="email" placeholder="Email address" />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input placeholder="Password" />
                    </InputGroup>
                    {/* <FormHelperText textAlign="right">
                      {/* <Link>forgot password?</Link> */}
                    {/* </FormHelperText> */}
                  </FormControl>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
                    width="full"
                  >
                    Sign in
                  </Button>
                  <p>or</p>
                  <Button
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="teal"
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
