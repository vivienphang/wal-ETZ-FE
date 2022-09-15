import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

import currencyList from "../constants/currencyList";
import { UserContext } from "../provider/GlobalProvider";

export default function AddAccount() {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  // Creating const to be sent through axios call
  const [accName, setAccName] = useState("");
  const [accCurrency, setAccCurrency] = useState("");
  const [balance, setBalance] = useState(0);
  // onChange events to set states
  const handleAccName = (e: { currentTarget: { value: any } }) => {
    setAccName(e.currentTarget.value);
  };
  const handleCurrency = (e: { currentTarget: { value: any } }) => {
    setAccCurrency(e.currentTarget.value);
  };
  const handleBalance = (e: { currentTarget: { value: any } }) => {
    setBalance(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    // getting jwt token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loading");
      return;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log(config);
    // Make axios call to create new account
    // getting userId
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
    <div>
      <FormControl>
        <FormLabel>Account Name</FormLabel>
        <Input name="accName" onChange={handleAccName} />
        {/* <FormHelperText>Account names have to be unique</FormHelperText>
        <FormErrorMessage>Name is required.</FormErrorMessage> */}
        <FormLabel>Account Currency</FormLabel>
        <Select
          name="accCurrency"
          placeholder="Select your currency!"
          onChange={handleCurrency}
        >
          {currencyList.map((currency) => (
            <option key={currency.currencyAbbv} value={currency.currencyAbbv}>
              {currency.currencyName}
            </option>
          ))}
        </Select>
        <FormLabel>Starting Balance</FormLabel>
        <Input name="balance" type="number" onChange={handleBalance} />
        <Button type="submit" m="5" onClick={handleSubmit}>
          Create Account
        </Button>
      </FormControl>
    </div>
  );
}
