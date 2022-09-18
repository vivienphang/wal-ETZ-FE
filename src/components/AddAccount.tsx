import React, { useState, useContext } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import currencyList from "../constants/currencyList";
import { AccountsContext } from "../provider/GlobalProvider";
import { addRecordPropInterface } from "../types/propInterface";
import { newAccount } from "../reducers/accountReducer";
import colorList from "../constants/colorList";

export default function AddAccount(props: addRecordPropInterface) {
  const { accountsDispatch } = useContext(AccountsContext);
  const { onClose } = props;

  const [accName, setAccName] = useState("");
  const [accCurrency, setAccCurrency] = useState("");
  const [balance, setBalance] = useState("");

  const [inputErr, setInputErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAccName: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const sanitization = value.trim().match(/[A-Za-z0-9\-_]*/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    if (value !== sanitizedValue) {
      setInputErr(true);
      setErrorMsg("value must be number");
      setTimeout(() => {
        setInputErr(false);
      }, 2500);
    } else {
      setInputErr(false);
      setAccName(value);
    }
  };

  const handleCurrency: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setAccCurrency(value);
  };

  const handleBalance: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setBalance(value);
  };

  const handleSubmit = async () => {
    if (!accName) {
      setInputErr(true);
      setErrorMsg("Please enter account name");
      setTimeout(() => {
        setInputErr(false);
      }, 2500);
      return;
    }

    if (!accCurrency) {
      setInputErr(true);
      setErrorMsg("Please enter currency");
      setTimeout(() => {
        setInputErr(false);
      }, 2500);
      return;
    }

    if (!balance) {
      setInputErr(true);
      setErrorMsg("Please enter initial balance");
      setTimeout(() => {
        setInputErr(false);
      }, 2500);
    }

    const data = {
      accName,
      accCurrency,
      balance,
    };

    const token = localStorage.getItem("token");

    accountsDispatch!(await newAccount({ ...data, token }));

    onClose();
  };

  return (
    <FormControl>
      <FormLabel>Account Name</FormLabel>
      <Input name="accName" onChange={handleAccName} value={accName} />
      <FormLabel>Account Currency</FormLabel>
      <Select
        name="accCurrency"
        placeholder="Select your currency!"
        onChange={handleCurrency}
        value={accCurrency}
      >
        {currencyList.map((currency) => (
          <option key={currency.currencyAbbv} value={currency.currencyAbbv}>
            {currency.currencyName}
          </option>
        ))}
      </Select>
      <FormLabel>Initial Balance</FormLabel>
      <NumberInput defaultValue={0} precision={2} step={0.1} min={0}>
        <NumberInputField
          type="number"
          onChange={handleBalance}
          value={balance}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormHelperText
        className={inputErr ? "show" : "hide"}
        transition="0.8s linear"
        color="red"
      >
        {errorMsg}
      </FormHelperText>
      <Button
        bg={colorList.buttonPrimary}
        color="white"
        my={2}
        type="submit"
        onClick={handleSubmit}
      >
        Create Account
      </Button>
    </FormControl>
  );
}
