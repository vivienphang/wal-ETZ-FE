import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line object-curly-newline
import { Flex, Box, Spacer, Container, Button } from "@chakra-ui/react";

axios.defaults.withCredentials = true;
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const backEndUrl = process.env.REACT_APP_BACKEND_URL;
    // if req.user exists, post logout
    console.log("LOGGING OUT");
    window.location.href = `${backEndUrl}/auth/logout`;
  };
  return (
    <Container bg="gray.400" color="white">
      <Flex minWidth="max-content" alignItems="flex-start" gap="0">
        <Box p="2">{/* <Heading size="md">Chakra App</Heading> */}</Box>
        <Spacer />
        <Button
          colorScheme="teal"
          onClick={() => {
            navigate("/home");
          }}
        >
          Main Page
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => {
            navigate("/balanceChart");
          }}
        >
          Balance Chart
        </Button>
        <Button colorScheme="teal" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Container>
  );
}

export default Navbar;
