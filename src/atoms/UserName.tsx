import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Switch,
  Center,
} from "@chakra-ui/react";
import { ExchangeRateContext, UserContext } from "../provider/GlobalProvider";
import { updateCurrency, updateProfile } from "../reducers/globalAction";
import { updateUsername } from "../reducers/userReducer";
import currencyList from "../constants/currencyList";
import ACTIONS from "../reducers/actions";
import colorList from "../constants/colorList";

axios.defaults.withCredentials = true;

export default function ProfileForm() {
  const { userState, userDispatch } = useContext(UserContext);
  const { exchangeRateDispatch } = useContext(ExchangeRateContext);
  const [username, setUsername] = useState(userState?.username);
  const [accCurrency, setAccCurrency] = useState(userState?.defaultCurrency);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setUsername(event.target.value);

  const handleCurrency: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setAccCurrency(value);
  };

  const handleSwitch = () => {
    setIsEditing(!isEditing);
    setAccCurrency(userState?.defaultCurrency!);
  };

  const handleUpdateBtn: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("update button clicked");
    const token = localStorage.getItem("token");
    if (!username) {
      setErrorMessage("Username is required.");
      return;
    }
    if (
      accCurrency !== userState?.defaultCurrency &&
      username !== userState?.username
    ) {
      const action = await updateProfile(username, accCurrency!, token!);
      userDispatch!(action.userAction);
      exchangeRateDispatch!(action.exchangeRateAction);
      if (action.userAction.type === ACTIONS.ERROR) {
        setErrorMessage("Username no longer available.");
      }
    } else if (username !== userState?.username) {
      const action = await updateUsername(username, token!);
      userDispatch!(action!);
      if (action.type === ACTIONS.ERROR) {
        setErrorMessage("Choose another username.");
      }
    } else if (accCurrency !== userState?.defaultCurrency) {
      const action = await updateCurrency(accCurrency!, token!);
      userDispatch!(action.userAction);
      exchangeRateDispatch!(action.exchangeRateAction);
    }
    handleSwitch();
  };

  useEffect(() => {
    setUsername(userState!.username);
    setAccCurrency(userState!.defaultCurrency);
  }, [userState]);

  return (
    <div>
      <FormControl>
        <Box display="flex" justifyContent="center">
          <FormLabel htmlFor="allow-edit" mb="0">
            Update profile?
          </FormLabel>

          <Switch
            size="md"
            id="allow-edit"
            isChecked={isEditing}
            onChange={handleSwitch}
          />
        </Box>
      </FormControl>
      <br />

      <Box
        w="100%"
        p={3}
        borderWidth="2px"
        borderRadius="lg"
        borderColor={colorList.component}
        bg={colorList.alternateRowColor}
      >
        <form onSubmit={handleUpdateBtn}>
          <FormControl>
            <Center>
              <FormLabel>Username:</FormLabel>
            </Center>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              disabled={!isEditing}
            />
            <br />
          </FormControl>
          <br />
          <Center>
            <FormLabel>Default currency:</FormLabel>
          </Center>
          <Select
            name="defaultCurrency"
            onChange={handleCurrency}
            value={accCurrency}
            disabled={!isEditing}
          >
            {currencyList.map((currency) => (
              <option key={currency.currencyAbbv} value={currency.currencyAbbv}>
                {currency.currencyName}
              </option>
            ))}
          </Select>
          <FormControl>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
          <br />
          <Center>
            <Button
              bg={colorList.buttonPrimary}
              borderRadius="md"
              color={colorList.drawerModal}
              _hover={{
                bg: colorList.component,
                color: colorList.textColor,
              }}
              _active={{
                bg: colorList.buttonSecondary,
                color: colorList.textColor,
              }}
              width="full"
              type="submit"
              disabled={!isEditing}
            >
              Update
            </Button>
          </Center>
        </form>
      </Box>
    </div>
  );
}
