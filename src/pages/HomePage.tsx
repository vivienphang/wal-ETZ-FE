import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
import { DateTime } from "luxon";
import AllAccDisplay from "../components/AllAccDisplay";
import Filter from "../components/Filter";
import AccountsCarousel from "../components/AccountsCarousel";
import BalanceChart from "../components/BalanceChart";
import EIPieChart from "../components/EIPieChart";
import Navbar from "../components/Navbar";
import { UserContext, AccountsContext } from "../provider/GlobalProvider";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { filterInterface } from "../types/filterInterface";

let initialRecs: accountRecordsInterface[] = [];

function HomePage() {
  const { userState } = useContext(UserContext);
  const { accountsState } = useContext(AccountsContext);
  // Creating states to be shared among children
  const [chosenAcc, setChosenAcc] = useState("");
  const [recs, setRecs] = useState<accountRecordsInterface[]>([]);

  useEffect(() => {
    accountsState?.map((account) => {
      initialRecs = [...initialRecs, ...account.accRecords!];
      return initialRecs;
    });
    // Why is the setRecs not working?
  }, []);
  // Add the combination of all accounts here

  const navigate = useNavigate();

  // Filter
  const currentDate = DateTime.now();
  const initFilterState = {
    startDate: DateTime.utc(currentDate.year, currentDate.month, 1).toISODate(),
    endDate: DateTime.utc(
      currentDate.year,
      currentDate.month,
      currentDate.day
    ).toISODate(),
  };
  const [filters, setFilters] = useState<filterInterface>(initFilterState);

  useEffect(() => {
    if (!userState?._id) {
      navigate("/loading");
    }
  }, [userState]);
  useEffect(() => {
    // Setting the records state as chosenAcc records
    accountsState?.forEach((account) => {
      if (account._id === chosenAcc) {
        // Take the chosenAcc's accRecords
        setRecs(account.accRecords!);
        return;
      }
      if (!chosenAcc) {
        setRecs(initialRecs);
      }
    });
  }, [chosenAcc]);
  return (
    <Wrap
      bg="gray.100"
      maxHeight="100%"
      maxWidth="100%"
      display="flex"
      flexDirection={["column", "row", "row"]}
      justifyContent="space-around"
      alignItems="center"
      fontSize={["30px"]}
      overflowY="scroll"
      overflowX="scroll"
    >
      <h1>HOME</h1>
      <AccountsCarousel />
      <AllAccDisplay chosenAcc={chosenAcc} setChosenAcc={setChosenAcc} />
      <Filter filters={filters} setFilters={setFilters} />
      <BalanceChart recs={recs} />
      <EIPieChart recs={recs} />
      <Navbar />
    </Wrap>
  );
}

export default HomePage;
