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
import colorList from "../constants/colorList";

export default function InitAccount() {
  const navigate = useNavigate();
  const { userState } = useContext(UserContext);
  const { accountsState } = useContext(AccountsContext);

  const [fadeIn, setFadeIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("spacer");
  const [inputErr, setInputErr] = useState(false);

  const [accName, setAccName] = useState("");
  const [accCurrency, setAccCurrency] = useState("");
  const [balance, setBalance] = useState("");

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!accName || !accCurrency || !balance) {
      setInputErr(true);
      setErrorMsg("Please enter initial balance and currency!");
      setTimeout(() => {
        setInputErr(false);
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

  const handleAccNameChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const sanitization = value.trim().match(/[A-Za-z0-9\-_]*/);
    const sanitizedValue = sanitization ? sanitization[0] : "";
    if (value !== sanitizedValue) {
      setInputErr(true);
      setErrorMsg(
        "only alphanumeric characters, underscores(_) and dashes(-) are allowed!"
      );
      setTimeout(() => {
        setInputErr(false);
      }, 2500);
    } else {
      setInputErr(false);
      setAccName(value);
    }
  };

  const handleBalanceChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const sanitization = value.trim().match(/\d*(\.\d{0,2})?/);
    const sanitizedValue = sanitization ? sanitization[0] : "";

    if (value !== sanitizedValue) {
      setInputErr(true);
      setErrorMsg("Please enter your input in the format of -111.23-");
      setTimeout(() => {
        setInputErr(false);
      }, 2500);
    } else {
      setInputErr(false);
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
        bg={colorList.drawerModal}
        p="5"
        transition="0.8s linear"
        className={fadeIn ? "show" : "hide"}
      >
        <Heading fontSize="3xl" color={colorList.textColor}>
          Get started with Aureus!
        </Heading>
        <Text fontSize="xl" color={colorList.textColor}>
          Your personalized money manager!
        </Text>
        <Text fontSize="xl" color={colorList.textColor}>
          Create your first account!
        </Text>
        <br />
        <form onSubmit={submitHandler}>
          <FormControl>
            <Center>
              <FormLabel my={2} color={colorList.textColor}>
                Account Name
              </FormLabel>
            </Center>
            <Input
              name="accName"
              onChange={handleAccNameChange}
              value={accName}
              disabled={!fadeIn}
            />
            <Center>
              <FormLabel my={2} color={colorList.textColor}>
                Currency
              </FormLabel>
            </Center>
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
            <Center>
              <FormLabel my={2} color={colorList.textColor}>
                Initial Balance
              </FormLabel>
            </Center>
            <Input
              name="balance"
              onChange={handleBalanceChange}
              value={balance}
              disabled={!fadeIn}
            />
            <FormHelperText
              className={inputErr ? "show" : "hide"}
              transition="0.8s linear"
              color="red"
            >
              {errorMsg}
            </FormHelperText>
            <Button
              bg={colorList.buttonPrimary}
              color={colorList.drawerModal}
              _hover={{
                bg: colorList.component,
                color: colorList.textColor,
              }}
              _active={{
                bg: colorList.buttonSecondary,
                color: colorList.textColor,
              }}
              type="submit"
              mb={2}
              mt={4}
            >
              Start managing your 💲!
            </Button>
          </FormControl>
        </form>
      </Box>
    </Center>
  );
}
