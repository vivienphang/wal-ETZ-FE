import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
import AllAccDisplay from "../components/AllAccDisplay";
import Filter from "../components/Filter";
import BalanceChart from "../components/BalanceChart";
import EIPieChart from "../components/EIPieChart";
import Navbar from "../components/Navbar";
// import { userState } from "../types/userReducerInterface";
import { UserContext, AccountsContext } from "../provider/GlobalProvider";
import { accountRecordsInterface } from "../types/accountReducerInterface";

function HomePage() {
  const { userState } = useContext(UserContext);
  const { accountsState } = useContext(AccountsContext);
  // Creating states to be shared among children
  const [chosenAcc, setChosenAcc] = useState("");
  const [recs, setRecs] = useState<accountRecordsInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState?._id) {
      navigate("/loading");
    }
  }, [userState]);
  useEffect(() => {
    console.log(chosenAcc);
    // Setting the records state as chosenAcc records
    accountsState?.forEach((account) => {
      if (account._id === chosenAcc) {
        // Take the chosenAcc's accRecords
        setRecs(account.accRecords!);
      }
    });
  }, [chosenAcc]);

  return (
    <Wrap
      bg="#BDE4A8"
      maxHeight="100%"
      maxWidth="100%"
      display="flex"
      flexDirection={["column", "row", "row"]}
      // justifyContent="space-around"
      // alignContent="center"
      // alignItems="center"
      fontSize={["30px"]}
      overflowY="scroll"
      overflowX="scroll"
    >
      <Navbar />
      <h1>HOME</h1>
      {/* <AccountsCarousel /> */}
      <AllAccDisplay chosenAcc={chosenAcc} setChosenAcc={setChosenAcc} />
      <Filter />
      <BalanceChart recs={recs} />
      <EIPieChart recs={recs} />
    </Wrap>
  );
}

export default HomePage;
