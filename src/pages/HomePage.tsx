import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrap } from "@chakra-ui/react";
import { DateTime } from "luxon";
import AllAccDisplay from "../components/AllAccDisplay";
import Filter from "../components/Filter";
import BalanceChart from "../components/BalanceChart";
import EIPieChart from "../components/EIPieChart";
import Navbar from "../components/Navbar";
import LineChart from "../components/LineChart";
// import { userState } from "../types/userReducerInterface";
import { UserContext, AccountsContext } from "../provider/GlobalProvider";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { filterInterface } from "../types/filterInterface";
import { Line } from "react-chartjs-2";

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
      console.log(chosenAcc);
      if (chosenAcc === "") {
        setRecs(initialRecs);
        return;
      }
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
      bg="#BDE4A8"
      maxHeight="100%"
      maxWidth="100%"
      display="flex"
      flexDirection={["column", "row", "row"]}
      fontSize={["30px"]}
      overflowY="scroll"
      overflowX="scroll"
    >
      {/* Pass in filtered data as recs */}
      <Navbar />
      <LineChart recs={recs} />
      <AllAccDisplay chosenAcc={chosenAcc} setChosenAcc={setChosenAcc} />
      <Filter filters={filters} setFilters={setFilters} />
      <BalanceChart recs={recs} />
      <EIPieChart recs={recs} />
    </Wrap>
  );
}

export default HomePage;
