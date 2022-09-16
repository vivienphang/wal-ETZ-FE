import {
  Avatar,
  Center,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { recordsListPropInterface } from "../types/propInterface";
import {
  incomeCategories,
  expenseCategories,
  inaccessibleCategories,
} from "../constants/categoryList";
import { categoryInterface } from "../types/constantInterface";

export default function RecordsList(props: recordsListPropInterface) {
  const { filteredRec, setChosenRec, accSymbol, onOpen } = props;

  const handleRowClick: React.MouseEventHandler = (e: React.MouseEvent) => {
    const recId = e.currentTarget.id;
    const filterSingleRec = (record: accountRecordsInterface) => {
      return record._id === recId;
    };
    const chosenRec = filteredRec.filter(filterSingleRec);
    setChosenRec(chosenRec[0]);
    onOpen();
  };

  const recordsList = filteredRec.map((record: accountRecordsInterface) => {
    const recordDate = new Date(record.recordDate!).toISOString();

    const categoryFilter = (category: categoryInterface) => {
      return record.recordCategory === category.name;
    };

    const allCategories = [
      ...expenseCategories,
      ...incomeCategories,
      ...inaccessibleCategories,
    ];

    const recordCat = allCategories.filter(categoryFilter);

    const recordIcon = recordCat[0] ? recordCat[0].icon : GiHamburgerMenu;

    return (
      <Tr key={record._id} onClick={handleRowClick} id={record._id}>
        <Td>
          <Avatar
            size="md"
            icon={<Icon as={recordIcon} />}
            bg={record.isExpense ? "red.100" : "green.100"}
          />
        </Td>
        <Td>
          <Text fontSize="xs">
            {DateTime.fromISO(recordDate).toFormat("MMM dd t")}
          </Text>
        </Td>
        <Td>
          <Text color={record.isExpense ? "red.400" : "green.400"}>
            {`${accSymbol} ${Number(record.amount).toLocaleString("en-us", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </Text>
        </Td>
      </Tr>
    );
  });
  useEffect(() => {
    console.log(filteredRec);
  }, [filteredRec]);

  return (
    <Center>
      <Table my={2} size="sm" borderY={0}>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>{recordsList}</Tbody>
      </Table>
    </Center>
  );
}
