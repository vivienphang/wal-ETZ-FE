import React, { useState, useEffect, useContext } from "react";
// Import action creator to make axios call for records
import {
  Button,
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
import AccountList from "../components/AccountList";
import { addRecord } from "../reducers/accountReducer";
import { AccountsContext } from "../provider/GlobalProvider";

// import Calculator from "../components/Calculator";

// Component showing add record page
export default function AddRecord() {
  // Get current account state and information
  const { accountsState } = useContext(AccountsContext);
  // Statese for the add account form
  const [acc, setAcc] = useState("");
  const [accId, setAccId] = useState("");
  const [cat, setCat] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [amount, setAmount] = useState("0.00");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const data = {
    amount,
    name,
    comment,
    date,
    isExpense,
    acc,
    cat,
  };

  // Functions to handle the states
  const isET = () => {
    setIsExpense(true);
  };
  const isEF = () => {
    setIsExpense(false);
  };
  const addAmount = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(e.target.value);
    // I dont understand why this is an error when i changed the type to string at line 39
    setAmount(e.target.value);
  };
  const addDate = (e: { target: { value: React.SetStateAction<string> } }) => {
    setDate(e.target.value);
  };
  const addName = (e: { target: { value: React.SetStateAction<string> } }) => {
    setName(e.target.value);
  };
  const addComment = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };
  // Function to create record
  const createRecord = () => {
    // send data through the action creator
    // update data into db records accounts
    // update the reducer of accountState
    // update all the things that are rendered based on the state
    // Get jwt token
    const token = localStorage.getItem("token");
    console.group(token);
    const data = {
      token,
      accId,
      amount,
      name,
      comment,
      date,
      isExpense,
      acc,
      cat,
      // Get the token for jwt
    };
    console.log(data);
    addRecord(data);
  };
  // Checking change in State
  useEffect(() => {
    // Checking to see when any changes are made to fields
    console.log(data);
  }, [amount, name, comment, date, isExpense, acc, cat]);
  // UseEffect to get the account id based on acc change
  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account.accName === acc) {
        console.log("Current Account", account.accName);
        const id = account._id;
        console.log(id);
        setAccId(id);
      }
    });
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
        {/* <NumberInput precision={2} step={0.1} allowMouseWheel>
          <NumberInputField onChange={addAmount} />
          <NumberInputStepper>
            <NumberIncrementStepper onChange={addAmount} />
            <NumberDecrementStepper onChange={addAmount} />
          </NumberInputStepper>
        </NumberInput> */}
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
