/* eslint-disable import/order */
import React from "react";
import ExpensePie from "./ExpensePie";
import IncomePie from "./IncomePie";
import { Box, Flex } from "@chakra-ui/react";
import { EIPieChartPropInterface } from "../types/propInterface";

// Use account state here
export default function EIPieChart(props: EIPieChartPropInterface) {
  const { recs } = props;
  return (
    <Flex justifyContent="space-between" flexDirection="column">
      <Box w="95%">
        <ExpensePie recs={recs} />
      </Box>
      <Box w="95%">
        <IncomePie recs={recs} />
      </Box>
    </Flex>
  );
}
