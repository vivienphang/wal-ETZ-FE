import { Box, Flex, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useState, useContext, useEffect } from "react";
import AccountList from "../components/AccountList";
import Filter from "../components/Filter";
import RecordsList from "../components/RecordsList";
import { AccountsContext } from "../provider/GlobalProvider";
import {
  accountRecordsInterface,
  singularAccountInterface,
} from "../types/accountReducerInterface";
import { filterInterface } from "../types/filterInterface";

export default function Records() {
  const currentDate = DateTime.now();
  const initFilterState = {
    startDate: DateTime.utc(currentDate.year, currentDate.month, 1).toISODate(),
    endDate: DateTime.utc(
      currentDate.year,
      currentDate.month,
      currentDate.day
    ).toISODate(),
    viewExpense: false,
    viewIncome: false,
  };
  const [acc, setAcc] = useState("");
  const [rec, setRec] = useState<accountRecordsInterface[]>([]);
  const [currentAcc, setCurrentAcc] = useState<singularAccountInterface>();
  const [filteredRec, setFilteredRec] = useState<accountRecordsInterface[]>([]);
  const [filters, setFilters] = useState<filterInterface>(initFilterState);

  const { accountsState } = useContext(AccountsContext);

  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account._id === acc) {
        console.log("Current Account", account.accName);
        setRec!(account.accRecords!);
        setCurrentAcc(account);
      }
    });
  }, [acc]);

  useEffect(() => {
    const dateFilter = (record: accountRecordsInterface) => {
      return (
        DateTime.fromISO(record.recordDate!) >
          DateTime.fromISO(filters.startDate).startOf("day") &&
        DateTime.fromISO(record.recordDate!) <
          DateTime.fromISO(filters.endDate).endOf("day")
      );
    };
    const expenseFilter = (record: accountRecordsInterface) => {
      return record.isExpense;
    };

    const incomeFilter = (record: accountRecordsInterface) => {
      return !record.isExpense;
    };
    const preFilteredRecords = [...rec];

    let postFilteredRecords = preFilteredRecords.filter(dateFilter);

    if (filters.viewExpense) {
      postFilteredRecords = postFilteredRecords.filter(expenseFilter);
    } else if (filters.viewIncome) {
      postFilteredRecords = postFilteredRecords.filter(incomeFilter);
    }

    setFilteredRec(postFilteredRecords);
  }, [rec, filters]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div>
      <Heading size="md" py={5}>
        {currentAcc
          ? `Records of - ${currentAcc.accName}`
          : "Select an account"}
      </Heading>
      <Flex minW="max-content">
        <Box w="85%" mr={1}>
          <AccountList acc={acc} setAcc={setAcc} />
        </Box>
        <Box w="15%" ml={1}>
          <Filter filters={filters} setFilters={setFilters} />
        </Box>
      </Flex>
      <RecordsList filteredRec={filteredRec} />
    </div>
  );
}
