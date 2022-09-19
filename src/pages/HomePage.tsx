import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
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
import {
  accountRecordsInterface,
  singularAccountInterface,
} from "../types/accountReducerInterface";
import { filterInterface } from "../types/filterInterface";
import colorList from "../constants/colorList";
import currencyList from "../constants/currencyList";
import { currencyInterface } from "../types/constantInterface";

function HomePage() {
  const { userState } = useContext(UserContext);
  const { accountsState } = useContext(AccountsContext);
  const { exchangeRateState } = useContext(ExchangeRateContext);

  const navigate = useNavigate();

  const currentDate = DateTime.now();
  const initFilterState = {
    startDate: DateTime.utc(currentDate.year, currentDate.month, 1).toISODate(),
    endDate: DateTime.utc(
      currentDate.year,
      currentDate.month,
      currentDate.day
    ).toISODate(),
  };
  const initAccountState = {};

  const [accSymbol, setAccSymbol] = useState("");
  const [chosenAcc, setChosenAcc] = useState("");
  const [currentAcc, setCurrentAcc] =
    useState<singularAccountInterface>(initAccountState);
  const [totalSum, setTotalSum] = useState(0);
  const [recs, setRecs] = useState<accountRecordsInterface[]>([]);
  const [initialRecs, setInitialRecs] = useState<accountRecordsInterface[]>([]);
  // Created this to show account names but its not being used to be deleted
  const [accName, setAccName] = useState("");
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
    let iRecs: any[] = [];
    accountsState?.map((account) => {
      const adjustedRec = account.accRecords?.map((record) => {
        const recCopy = { ...record };
        recCopy.amount = (
          Number(recCopy.amount) / exchangeRateState![account.accCurrency!]
        ).toFixed(2);
        return recCopy;
      });
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

  useEffect(() => {
    accountsState?.forEach((account) => {
      if (chosenAcc === "") {
        setCurrentAcc(initAccountState);
        setRecs(initialRecs);
        setAccName("");
        return;
      }
      if (account._id === chosenAcc) {
        setCurrentAcc(account);
        setRecs(account.accRecords!);
        setAccName(account.accName!);
        return;
      }
      if (!chosenAcc) {
        setCurrentAcc(initAccountState);
        setRecs(initialRecs);
      }
    });
  }, [chosenAcc, initialRecs]);

  useEffect(() => {
    let sum = 0;
    recs.forEach((record) => {
      if (record.isExpense) {
        sum -= Number(record.amount);
      } else {
        sum += Number(record.amount);
      }
    });
    sum = Number(sum.toFixed(2));
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
    setTotalSum(sum);
  }, [recs, filters]);

  useEffect(() => {
    const filterAcc = (currency: currencyInterface) => {
      if (!currentAcc.accCurrency) {
        return userState!.defaultCurrency === currency.currencyAbbv;
      }
      return currentAcc.accCurrency === currency.currencyAbbv;
    };
    if (!userState) {
      return;
    }
    if (!userState.defaultCurrency) {
      return;
    }
    const chosenAcc = currencyList.filter(filterAcc);
    setAccSymbol(chosenAcc[0].currencySymbol);
  }, [currentAcc]);

  return (
    <Flex minH="100vh" width="100vw" flexDirection="column">
      <Center>
        <Box
          my={5}
          py={5}
          px={4}
          borderRadius="xl"
          w="90%"
          h="20vh"
          bg={colorList.component}
        >
          <AllAccDisplay chosenAcc={chosenAcc} setChosenAcc={setChosenAcc} />
        </Box>
      </Center>
      <Flex w="90%" flexDirection="row-reverse">
        <Filter filters={filters} setFilters={setFilters} />
      </Flex>
      <Center>
        <Box
          my={2}
          py={5}
          px={4}
          borderRadius="xl"
          w="90%"
          bg={colorList.component}
        >
          <Heading fontSize="sm" color={colorList.textColor}>
            Currently Selected Account:
          </Heading>
          <Text fontSize="4xl" as="i" color={colorList.textColor}>
            {accName
              ? `${accName} (${currentAcc.accCurrency})`
              : `All accounts (${userState?.defaultCurrency})`}
          </Text>
        </Box>
      </Center>
      <Center>
        <Box
          my={2}
          py={5}
          px={4}
          borderRadius="xl"
          w="90%"
          bg={colorList.component}
        >
          <Heading fontSize="sm" color={colorList.textColor}>
            Total Current Balance:
          </Heading>
          <Text fontSize="4xl" as="i" color={colorList.textColor}>
            {`${accSymbol} ${Number(totalSum.toFixed(2)).toLocaleString()}`}
          </Text>
        </Box>
      </Center>
      <Center>
        <Box
          w="90%"
          my={2}
          py={5}
          px={4}
          borderRadius="xl"
          bg={colorList.component}
        >
          <LineChart recs={filteredRecs} />
        </Box>
      </Center>
      <Center>
        <Box
          w="90%"
          my={2}
          py={5}
          px={4}
          borderRadius="xl"
          bg={colorList.component}
        >
          <BalanceChart recs={filteredRecs} />
        </Box>
      </Center>
      <Center>
        <Box
          w="90%"
          my={2}
          py={5}
          px={4}
          borderRadius="xl"
          bg={colorList.component}
        >
          <EIPieChart recs={filteredRecs} />
        </Box>
      </Center>
      <Navbar />
    </Flex>
  );
}

export default HomePage;
