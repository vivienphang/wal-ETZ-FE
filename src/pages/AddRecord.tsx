import React from "react";
import {
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import CategoryList from "../atoms/CategoryList";

// import Calculator from "../components/Calculator";

// Component showing add record page
export default function AddRecord() {
  return (
    <div>
      <h1>Amount</h1>
      <Select
        width="20%"
        bg="grey"
        borderColor="black"
        color="black"
        placeholder="Acc"
      />
      <HStack>
        <VStack>
          <h1>+</h1>
          <h1>-</h1>
        </VStack>
        {/* <Calculator /> */}
        <NumberInput precision={2} step={0.1} allowMouseWheel>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <Input placeholder="Date And Time" type="datetime-local" />
      <Input placeholder="Record Name" type="string" />
      <CategoryList />
      <Textarea
        placeholder="Here is a sample placeholder"
        size="sm"
        resize="none"
      />
    </div>
  );
}

// Logic for calculator
