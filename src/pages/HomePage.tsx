/* eslint-disable react/function-component-definition */
import React from "react";
// import { useNavigate } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
import AccountsCarousel from "../components/AccountsCarousel";
import Filter from "../components/Filter";
import BalanceChart from "../components/BalanceChart";
import EIPieChart from "../components/EIPieChart";
import Navbar from "../components/Navbar";

function HomePage() {
  // const whatever = async () => {
  //   const d = {
  //     id: "6305beb943e3928b3f62b640",
  //   };
  //   const data = await axios.post(
  //     `${process.env.REACT_APP_BACKEND_URL}/users/populateRecords`,
  //     d
  //   );
  //   console.log(data);
  //   };
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
  );
}

export default HomePage;
