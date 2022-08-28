/* eslint-disable react/function-component-definition */
import React from "react";
// import { useNavigate } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel.tsx";
import Filter from "../components/Filter.tsx";
import BalanceChart from "../components/BalanceChart.tsx";
import EIPieChart from "../components/EIPieChart.tsx";
import Navbar from "../components/Navbar.tsx";

function HomePage() {
  return (
    <Wrap
      bg="#BDE4A8"
      maxHeight="100%"
      maxWidth="100%"
      display="flex"
      flexDirection={["column", "row"]}
      // justifyContent="space-around"
      // alignContent="center"
      // alignItems="center"
      fontSize={["30px"]}
      overflowY="scroll"
      overflowX="scroll"
    >
      <Navbar />
      <h1>HOME</h1>
      <AccountsCarousel />
      <Filter />
      <BalanceChart />
      <EIPieChart />
    </Wrap>
    // </div>
  );
}

export default HomePage;
