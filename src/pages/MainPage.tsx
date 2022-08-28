/* eslint-disable react/function-component-definition */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Wrap } from "@chakra-ui/react";
import axios from "axios";

import AccountsCarousel from "../components/AccountsCarousel.tsx";
import Filter from "../components/Filter.tsx";
import BalanceChart from "../components/BalanceChart.tsx";
import EIPieChart from "../components/EIPieChart.tsx";

function MainPage() {
  const navigate = useNavigate();
  const whatever = async () => {
    const d = {
      id: "6305beb943e3928b3f62b640",
    };
    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/populateRecords`,
      d
    );
    console.log(data);
  };

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
        <Button onClick={whatever}>BalanceChart</Button>
      </Box>
    </Wrap>
  );
}

export default MainPage;
