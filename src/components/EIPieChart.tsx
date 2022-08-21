/* eslint-disable import/order */
import React from "react";
import ExpensePie from "./ExpensePie.tsx";
import IncomePie from "./IncomePie.tsx";
import { HStack } from "@chakra-ui/react";

export default function EIPieChart() {
  return (
    <HStack border="solid">
      <ExpensePie />
      <IncomePie />
    </HStack>
  );
}
