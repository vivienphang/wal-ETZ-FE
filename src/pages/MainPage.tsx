/* eslint-disable react/function-component-definition */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel.tsx";
import Charts from "../components/Charts2.tsx";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      bg="teal.200"
      w="100vw"
      h="100vh"
      fontSize=""
      display="flex"
      flexDirection={["column", "row"]}
      justifyContent="space-around"
      // alignContent="center"
      alignItems="center"
    >
      <h1>This is the main Page</h1>
      <AccountsCarousel />
      <Charts />
      <Box>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Main Page
        </Button>
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          SignUp
        </Button>
        <Button
          onClick={() => {
            navigate("/balanceChart");
          }}
        >
          BalanceChart
        </Button>
      </Box>
    </Box>
  );
};

export default MainPage;
