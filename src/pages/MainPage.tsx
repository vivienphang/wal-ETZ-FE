/* eslint-disable react/function-component-definition */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Wrap } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel.tsx";
import Filter from "../components/Filter.tsx";
import BalanceChart from "../components/BalanceChart.tsx";
import EIPieChart from "../components/EIPieChart.tsx";

const MainPage = () => {
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
      </Box>
    </Wrap>
  );
};

export default MainPage;
