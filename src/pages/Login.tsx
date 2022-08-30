/* eslint-disable react/no-children-prop */
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
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
                      <Input
                        // type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      />
                      <InputRightElement width="4.5rem">
                        {/* <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button> */}
                      </InputRightElement>
                    </InputGroup>
                    {/* <FormHelperText textAlign="right"> */}
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
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          {/* <Box>
            New to us?{" "}
            <Link color="teal.500" href="http://localhost:8000/signup">
              Sign Up
            </Link>
          </Box> */}
        </Flex>
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
      </div>
    </div>
  );
}

export default Login;
