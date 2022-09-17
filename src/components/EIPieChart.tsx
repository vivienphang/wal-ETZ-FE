/* eslint-disable import/order */
import React from "react";
import ExpensePie from "./ExpensePie";
import IncomePie from "./IncomePie";
import { VStack } from "@chakra-ui/react";
import { EIPieChartPropInterface } from "../types/propInterface";

// Use account state here
export default function EIPieChart(props: EIPieChartPropInterface) {
  const { recs } = props;
  return (
    <VStack>
      <ExpensePie recs={recs} />
      <IncomePie recs={recs} />
    </VStack>
  );
}
