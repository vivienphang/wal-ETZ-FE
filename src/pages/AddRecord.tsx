import React, { useState, useEffect, useContext } from "react";
// Import action creator to make axios call for records
import { Button, HStack, VStack, Input, Textarea } from "@chakra-ui/react";
import CategoryList from "../atoms/CategoryList";
import AccountList from "../components/AccountList";
import { addRecord } from "../reducers/accountReducer";
import { addRecordInterface } from "../types/accountReducerInterface";
import { AccountsContext } from "../provider/GlobalProvider";

// Component showing add record page
export default function AddRecord() {
  // Get current account state and information
  // Acc is accId
  const { accountsDispatch } = useContext(AccountsContext);
  const [acc, setAcc] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState<addRecordInterface>({});

  // Functions to handle the states
  const isET = () => {
    // setIsExpense(true);
    setData({ ...data, isExpense: true });
  };
  const isEF = () => {
    setData({ ...data, isExpense: false });
  };
  const addAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitization = e.target.value.trim().match(/\d*(\.\d{0,2})?/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    console.log(sanitizedValue);
    // I dont understand why this is an error when i changed the type to string at line 39
    setData({ ...data, amount: sanitizedValue });
  };
  const addDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, recordDate: e.target.value });
  };
  const addName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, recordName: e.target.value });
  };
  const addComment: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({ ...data, recordComment: e.target.value });
  };
  // Function to create record
  const createRecord = async () => {
    // send data through the action creator
    // update data into db records accounts
    // update all the things that are rendered based on the state
    // Get jwt token
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(data);
    accountsDispatch!(await addRecord({ ...data, token }));
  };
  // Checking change in State
  useEffect(() => {
    // Checking to see when any changes are made to fields
    console.log(data);
  }, [data]);
  useEffect(() => {
    // Checking to see when any changes are made to fields
    setData({ ...data, recordCategory: cat });
  }, [cat]);
  // UseEffect to get the account id based on acc change
  useEffect(() => {
    setData({ ...data, acc });
  }, [acc]);

  return (
    <div>
      <h1>New Record</h1>
      <AccountList acc={acc} setAcc={setAcc} />
      <HStack>
        <VStack>
          <Button onClick={isET}>+</Button>
          <Button onClick={isEF}>-</Button>
        </VStack>
        <Input placeholder="Enter Amount" type="number" onChange={addAmount} />
      </HStack>
      <Input
        placeholder="Date And Time"
        type="datetime-local"
        onChange={addDate}
      />
      <Input placeholder="Record Name" type="string" onChange={addName} />
      <CategoryList setCat={setCat} cat={cat} />
      <Textarea
        placeholder="Here is a sample placeholder"
        size="sm"
        resize="none"
        onChange={addComment}
      />
      <Button onClick={createRecord}>Create Record</Button>
    </div>
  );
}
