import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import currencyList from "../constants/currencyList";
import { AccountsContext, UserContext } from "../provider/GlobalProvider";

export default function InitAccount() {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  const { accountsState } = useContext(AccountsContext);

  const [fadeIn, setFadeIn] = useState(false);
  const [balanceInputErr, setBalanceInputErr] = useState(false);
  const [accNameInputErr, setAccNameInputErr] = useState(false);
  const [globalInputErr, setGlobalInputErr] = useState(false);

  const [accName, setAccName] = useState("");
  const [accCurrency, setAccCurrency] = useState("");
  const [balance, setBalance] = useState("");

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("submit button is clicked!");
    if (!accName || !accCurrency || !balance) {
      setGlobalInputErr(true);
      setTimeout(() => {
        setGlobalInputErr(false);
      }, 2500);
    } else {
      setFadeIn(false);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/loading");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const data = {
        accName,
        accCurrency,
        balance,
      };
      let createAccount: AxiosResponse | null = null;
      try {
        createAccount = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/accounts/initializeAccount`,
          data,
          config
        );
      } catch (err) {
        navigate("/loading");
      }
      console.log(createAccount);
      navigate("/loading");
    }
  };

  const handleCurrencyChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setAccCurrency(value);
  };

  // Account Name
  const handleAccNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    // Checks for a-z A-Z 0-9 _-
    const sanitization = value.trim().match(/[A-Za-z0-9\-_]*/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    if (value !== sanitizedValue) {
      setAccNameInputErr(true);
      setTimeout(() => {
        setAccNameInputErr(false);
      }, 2500);
    } else {
      setAccNameInputErr(false);
      setAccName(value);
    }
  };

  const handleBalanceChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // check via regex
    const { value } = e.target;
    const sanitization = value.trim().match(/\d*(\.\d{0,2})?/);
    const sanitizedValue = sanitization ? sanitization[0] : "";

    if (value !== sanitizedValue) {
      setBalanceInputErr(true);
      setTimeout(() => {
        setBalanceInputErr(false);
      }, 2500);
    } else {
      setBalanceInputErr(false);
      setBalance(sanitizedValue);
    }
  };

  useEffect(() => {
    if (!userState?._id || accountsState?.length) {
      navigate("/loading");
    }
    setTimeout(() => {
      setFadeIn(true);
    }, 300);
  }, []);

  return (
    <Center>
      <Box
        maxW="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="5"
        transition="0.8s linear"
        className={fadeIn ? "show" : "hide"}
      >
        <Heading fontSize="3xl">
          Get started with -working title- Wallet!
        </Heading>
        <Text fontSize="xl">Your personalized money manager!</Text>
        <Text fontSize="xl">Create your first account!</Text>
        <br />
        <form onSubmit={submitHandler}>
          <FormControl>
            <FormLabel>Account Name</FormLabel>
            <Input
              name="accName"
              onChange={handleAccNameChange}
              value={accName}
              isInvalid={accNameInputErr}
              disabled={!fadeIn}
            />
            <FormHelperText
              className={accNameInputErr ? "show" : "hide"}
              transition="0.8s linear"
              color="red"
            >
              only alphanumeric characters, underscores(_) and dashes(-) are
              allowed!
            </FormHelperText>
            <FormLabel>Currency</FormLabel>
            <Select
              name="accCurrency"
              onChange={handleCurrencyChange}
              value={accCurrency}
              placeholder="Select your currency!"
              disabled={!fadeIn}
            >
              {currencyList.map((currency) => (
                <option
                  key={currency.currencyAbbv}
                  value={currency.currencyAbbv}
                >
                  {currency.currencyName}
                </option>
              ))}
            </Select>
            <FormLabel>Initial Balance</FormLabel>
            <Input
              name="balance"
              onChange={handleBalanceChange}
              value={balance}
              isInvalid={balanceInputErr}
              disabled={!fadeIn}
            />
            <FormHelperText
              className={balanceInputErr ? "show" : "hide"}
              transition="0.8s linear"
              color="red"
            >
              Please enter your input in the format of &lsquo;111.23&rsquo;
            </FormHelperText>
            <Button type="submit" m="5">
              Start managing your 💲!
            </Button>
            <FormHelperText
              className={globalInputErr ? "show" : "hide"}
              transition="0.8s linear"
              color="red"
            >
              Please enter initial balance and currency!
            </FormHelperText>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}
