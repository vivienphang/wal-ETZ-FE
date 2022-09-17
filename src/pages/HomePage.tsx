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
import {
  UserContext,
  AccountsContext,
  ExchangeRateContext,
} from "../provider/GlobalProvider";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { filterInterface } from "../types/filterInterface";

function HomePage() {
  const { userState } = useContext(UserContext);
  const { accountsState } = useContext(AccountsContext);
  const { exchangeRateState } = useContext(ExchangeRateContext);
  // Creating states to be shared among children
  const [chosenAcc, setChosenAcc] = useState("");
  const [recs, setRecs] = useState<accountRecordsInterface[]>([]);
  const [initialRecs, setInitialRecs] = useState<accountRecordsInterface[]>([]);

  useEffect(() => {
    console.log(exchangeRateState);
    let iRecs: any[] = [];
    accountsState?.map((account) => {
      const adjustedRec = account.accRecords?.map((record) => {
        const recCopy = { ...record };
        recCopy.amount = (
          Number(recCopy.amount) / exchangeRateState![account.accCurrency!]
        ).toFixed(2);
        return recCopy;
      });
      console.log(adjustedRec);
      iRecs = [...iRecs, ...adjustedRec!];
      return iRecs;
    });
    // Need to sort out the initial recs
    iRecs.sort((a: accountRecordsInterface, b: accountRecordsInterface) => {
      return (
        DateTime.fromISO(b.recordDate!).toUnixInteger() -
        DateTime.fromISO(a.recordDate!).toUnixInteger()
      );
    });
    setInitialRecs(iRecs);
  }, [accountsState, exchangeRateState]);

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
  const [filteredRecs, setFilteredRecs] = useState<accountRecordsInterface[]>(
    []
  );

  useEffect(() => {
    if (!userState?._id) {
      navigate("/loading");
    }
  }, [userState]);

  useEffect(() => {
    // Setting the records state as chosenAcc records
    accountsState?.forEach((account) => {
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
  }, [chosenAcc, initialRecs]);

  useEffect(() => {
    const dateFilter = (record: accountRecordsInterface) => {
      return (
        DateTime.fromISO(record.recordDate!) >
          DateTime.fromISO(filters.startDate).startOf("day") &&
        DateTime.fromISO(record.recordDate!) <
          DateTime.fromISO(filters.endDate).endOf("day")
      );
    };
    const preFilteredRecords = [...recs];
    const postFilteredRecords = preFilteredRecords.filter(dateFilter);
    setFilteredRecs(postFilteredRecords);
  }, [recs, filters]);
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
      {/* Pass in filtered data as recs */}
      <LineChart recs={filteredRecs} />
      <AllAccDisplay chosenAcc={chosenAcc} setChosenAcc={setChosenAcc} />
      <Filter filters={filters} setFilters={setFilters} />
      <BalanceChart recs={filteredRecs} />
      <EIPieChart recs={filteredRecs} />
      <Navbar />
    </Wrap>
  );
}

export default HomePage;
