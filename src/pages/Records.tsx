import {
  Box,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useState, useContext, useEffect } from "react";
import AccountList from "../components/AccountList";
import Filter from "../components/Filter";
import RecordsList from "../components/RecordsList";
import ViewRecord from "../components/ViewRecord";
import currencyList from "../constants/currencyList";
import { AccountsContext } from "../provider/GlobalProvider";
import {
  accountRecordsInterface,
  singularAccountInterface,
} from "../types/accountReducerInterface";
import { currencyInterface } from "../types/constantInterface";
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
  const initRecordState = {};
  const initAccountState = {};

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [acc, setAcc] = useState("");
  const [rec, setRec] = useState<accountRecordsInterface[]>([]);
  const [currentAcc, setCurrentAcc] =
    useState<singularAccountInterface>(initAccountState);
  const [filteredRec, setFilteredRec] = useState<accountRecordsInterface[]>([]);
  const [chosenRec, setChosenRec] =
    useState<accountRecordsInterface>(initRecordState);
  const [filters, setFilters] = useState<filterInterface>(initFilterState);
  const [totalSum, setTotalSum] = useState(0);
  const [accSymbol, setAccSymbol] = useState("");

  const { accountsState } = useContext(AccountsContext);

  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account._id === acc) {
        console.log("Current Account", account.accName);
        setRec!(account.accRecords!);
        setCurrentAcc(account);
      }
    });
  }, [acc, accountsState]);

  useEffect(() => {
    const filterAcc = (currency: currencyInterface) => {
      return currentAcc.accCurrency === currency.currencyAbbv;
    };
    if (!currentAcc.accCurrency) {
      return;
    }
    const chosenAcc = currencyList.filter(filterAcc);
    setAccSymbol(chosenAcc[0].currencySymbol);
  }, [currentAcc]);

  useEffect(() => {
    const dateFilter = (record: accountRecordsInterface) => {
      return (
        DateTime.fromISO(record.recordDate!) >=
          DateTime.fromISO(filters.startDate).startOf("day") &&
        DateTime.fromISO(record.recordDate!) <=
          DateTime.fromISO(filters.endDate).endOf("day")
      );
    };
    const expenseFilter = (record: accountRecordsInterface) => {
      if (record.isExpense) console.log(record);
      return record.isExpense;
    };

    const incomeFilter = (record: accountRecordsInterface) => {
      return !record.isExpense;
    };

    let sum = 0;

    const preFilteredRecords = [...rec];
    console.log(preFilteredRecords);

    let postFilteredRecords = preFilteredRecords.filter(dateFilter);

    if (filters.viewExpense) {
      postFilteredRecords = postFilteredRecords.filter(expenseFilter);
      console.log(postFilteredRecords);
    } else if (filters.viewIncome) {
      postFilteredRecords = postFilteredRecords.filter(incomeFilter);
      console.log(postFilteredRecords);
    }
    setFilteredRec(postFilteredRecords);

    postFilteredRecords.forEach((record) => {
      if (record.isExpense) {
        sum -= Number(record.amount!);
      } else {
        sum += Number(record.amount!);
      }
    });

    setTotalSum(sum);
  }, [rec, filters]);

  return (
    <>
      <Flex h="100vh" flexDirection="column">
        <Center>
          <Heading size="sm" pb={5} pt={2}>
            Period:
            {` ${DateTime.fromISO(filters.startDate).toFormat(
              "LLL d, y"
            )} - ${DateTime.fromISO(filters.endDate).toFormat("LLL d, y")}`}
          </Heading>
        </Center>
        <Flex minW="max-content">
          <Box w="85%" mr={1}>
            <AccountList acc={acc} setAcc={setAcc} />
          </Box>
          <Box w="15%" ml={1}>
            <Filter filters={filters} setFilters={setFilters} />
          </Box>
        </Flex>
        {currentAcc._id ? (
          <>
            <Box
              my={3}
              py={5}
              px={4}
              bg={totalSum > 0 ? "green.100" : "red.100"}
              borderRadius="xl"
            >
              <Center>
                <Heading size="sm">Total Cash Flow:</Heading>
              </Center>
              <Center my={4}>
                <Text fontSize="4xl" as="i">
                  {`${accSymbol} ${Math.abs(totalSum).toFixed(2)}`}
                </Text>
              </Center>
            </Box>
            <RecordsList
              filteredRec={filteredRec}
              accSymbol={accSymbol}
              setChosenRec={setChosenRec}
              onOpen={onOpen}
            />
          </>
        ) : (
          <Flex flex="1 1 auto" alignItems="center" justify="center">
            <Box>
              <Text fontSize="xl">Please select an account</Text>
            </Box>
          </Flex>
        )}
      </Flex>
      <Modal
        closeOnEsc
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg="#F7F6F3">
          <ModalHeader>View Record</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ViewRecord
              currentAcc={currentAcc}
              chosenRec={chosenRec}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
