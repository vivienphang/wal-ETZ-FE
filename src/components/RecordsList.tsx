import { DateTime } from "luxon";
import {
  Center,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { recordsListPropInterface } from "../types/propInterface";

export default function RecordsList(props: recordsListPropInterface) {
  // todo: maybe a total expense and total income for the filtered data?
  // todo: bring in account data here so as to make action creator calls.
  // todo: make said action creator
  const { filteredRec } = props;

  const handleRowClick: React.MouseEventHandler = (e: React.MouseEvent) => {
    // todo: get this particular record id and show it in a modal.
    console.log(e.currentTarget.id);
  };

  const recordsList = filteredRec.map((record: accountRecordsInterface) => {
    const recordDate = new Date(record.recordDate!).toISOString();
    return (
      <Tr
        key={record._id}
        bg={record.isExpense ? "red.100" : "green.100"}
        onClick={handleRowClick}
        id={record._id}
      >
        <Td>
          <Text fontSize="xs" as="sub">
            {record.recordCategory}
          </Text>
        </Td>
        <Td>
          <Text fontSize="xs">
            {DateTime.fromISO(recordDate).toFormat("MMM dd t")}
          </Text>
        </Td>
        <Td>
          <Text>{Number(record.amount).toFixed(2)}</Text>
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
