import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Flex,
  Box,
} from "@chakra-ui/react";
import CategoryList from "../atoms/CategoryList";
import AccountList from "../components/AccountList";
import { addRecord } from "../reducers/accountReducer";
import { addRecordInterface } from "../types/accountReducerInterface";
import { AccountsContext } from "../provider/GlobalProvider";

export default function AddRecord() {
  const initData = {
    amount: "",
    isExpense: false,
    recordName: "",
    recordComment: "",
    recordCategory: "",
    recordPhoto: "",
    recordDate: "",
  };

  const { accountsDispatch } = useContext(AccountsContext);
  const [acc, setAcc] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState<addRecordInterface>(initData);

  const isET = () => {
    setData({ ...data, isExpense: true });
  };
  const isEF = () => {
    setData({ ...data, isExpense: false });
  };
  const updateAmount: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const sanitization = value.trim().match(/\d*(\.\d{0,2})?/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    setData({ ...data, amount: sanitizedValue });
  };
  const updateDate: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, recordDate: e.target.value });
  };
  const updateName: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({ ...data, recordName: e.target.value });
  };
  const updateComment: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({ ...data, recordComment: e.target.value });
  };

  const createRecord = async () => {
    // todo: update reducer here
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(data);
    accountsDispatch!(await addRecord({ ...data, token }));
  };

  useEffect(() => {
    setData({ ...data, recordCategory: cat });
  }, [cat]);
  useEffect(() => {
    setData({ ...data, acc });
  }, [acc]);

  return (
    <div>
      <form onSubmit={createRecord}>
        <FormControl>
          <Center>
            <FormLabel>Select Account</FormLabel>
          </Center>
          <AccountList acc={acc} setAcc={setAcc} />
          <Center mt={1}>
            <FormLabel>
              {data.isExpense ? "Expense " : "Income "}
              Amount
            </FormLabel>
          </Center>
          <Flex>
            <Box w="25%">
              <Button onClick={isEF}>+</Button>
              <Button onClick={isET}>-</Button>
            </Box>
            <Box w="75%">
              <NumberInput defaultValue={0} precision={2} step={0.1} min={0}>
                <NumberInputField
                  type="number"
                  onChange={updateAmount}
                  value={data.amount}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
          <Center mt={1}>
            <FormLabel>Date of Transaction</FormLabel>
          </Center>
          <Input
            placeholder="Date And Time"
            type="datetime-local"
            onChange={updateDate}
            value={data.recordDate}
          />
          <Center mt={1}>
            <FormLabel>Record Name</FormLabel>
          </Center>
          <Input
            placeholder="Record Name"
            type="string"
            onChange={updateName}
          />
          <Center mt={1}>
            <FormLabel>Select Category</FormLabel>
          </Center>
          <CategoryList setCat={setCat} cat={cat} isExpense={data.isExpense!} />
          <Center mt={1}>
            <FormLabel>Comments</FormLabel>
          </Center>
          <Textarea
            placeholder="Here is a sample placeholder"
            size="sm"
            resize="none"
            onChange={updateComment}
            value={data.recordComment}
            mb={1}
          />
          <Button type="submit">Create Record</Button>
        </FormControl>
      </form>
    </div>
  );
}
