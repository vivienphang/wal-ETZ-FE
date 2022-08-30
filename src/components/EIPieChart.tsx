/* eslint-disable import/order */
import React from "react";
import ExpensePie from "./ExpensePie";
import IncomePie from "./IncomePie";
import { HStack } from "@chakra-ui/react";
import { getAccounts } from "../reducers/accountsReducer.ts";

export default function EIPieChart() {
  return (
    <HStack border="solid">
      <ExpensePie />
      <IncomePie />
    </HStack>
  );
}
