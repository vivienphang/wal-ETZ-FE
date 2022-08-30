/* eslint-disable react/function-component-definition */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Wrap } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel";
import Filter from "../components/Filter";
import BalanceChart from "../components/BalanceChart";
import EIPieChart from "../components/EIPieChart";

// import AccountsCarousel from "../components/AccountsCarousel.tsx";

function MainPage() {
  const navigate = useNavigate();

  return (
    <Wrap
      bg="#BDE4A8"
      height="100%"
      // display="flex"
      // flexDirection={["column", "column", "row"]}
      // justifyContent="space-around"
      // // alignContent="center"
      // alignItems="center"
      fontSize={["30px"]}
    >
      <h1>This is the main Page</h1>
      <AccountsCarousel />
      <Filter />
      <BalanceChart />
      <EIPieChart />
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
        <Button
          onClick={() => {
            navigate("/newAccount");
          }}
        >
          new account
        </Button>
      </Box>
    </Wrap>
  );
}

export default MainPage;
