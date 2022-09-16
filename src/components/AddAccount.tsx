import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
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
import { UserContext } from "../provider/GlobalProvider";
import { addRecordPropInterface } from "../types/propInterface";

export default function AddAccount(props: addRecordPropInterface) {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  const { onClose } = props;
  // Creating const to be sent through axios call
  const [accName, setAccName] = useState("");
  const [accCurrency, setAccCurrency] = useState("");
  const [balance, setBalance] = useState("");

  const [inputErr, setInputErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // onChange events to set states
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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loading");
      return;
    }

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

    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(config);
    const id = userState!._id;
    const data = {
      id,
      accName,
      accCurrency,
      balance,
    };
    console.log(data);
    let createAccount: AxiosResponse | null = null;
    try {
      createAccount = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/accounts/newAccount`,
        data,
        config
      );
      console.log(createAccount);
    } catch (err) {
      console.log(err);
    }
    //  Data is being properly set in the database
    // TO BE DONE
    // Dispatch OR throw to loader
    // Close the modal
    console.log("Create button closed");
    onClose();
  };

  useEffect(() => {
    const data = {
      accName,
      accCurrency,
      balance,
    };
    console.log(data);
  }, [accName, accCurrency, balance]);

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
      <Button type="submit" m="5" onClick={handleSubmit}>
        Create Account
      </Button>
    </FormControl>
  );
}
