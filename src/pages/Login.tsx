/* eslint-disable react/no-children-prop */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Flex,
  Stack,
  Avatar,
  Heading,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  chakra,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

axios.defaults.withCredentials = true;
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Login() {
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  // initialize states
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const googleLogin = () => {
    console.log("button clicked");
    try {
      window.location.href = `${backEndUrl}/auth/google`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("this is error:", error);
    }
  };

  return (
    <div>
      {/* <div className="LoginPage">
        <h1>Login Page</h1>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
        <br />
        <ButtonGroup gap="5">
          <Button colorScheme="facebook" onClick={googleLogin}>
            {" "}
            Sign in with Google
          </Button>
        </ButtonGroup>
      </div> */}
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
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
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
                    <Input type="email" placeholder="email address" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    {/* <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    /> */}
                    {/* <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement> */}
                  </InputGroup>
                  {/* <FormHelperText textAlign="right">
                    <Link to={""}>forgot password?</Link>
                  </FormHelperText> */}
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?
          <br />
          {/* <Link color="teal.500" href="/login">
            Sign Up
          </Link> */}
        </Box>
      </Flex>
    </div>
  );
}

export default Login;
