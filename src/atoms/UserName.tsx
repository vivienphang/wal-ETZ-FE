import React, { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ExchangeRateContext, UserContext } from "../provider/GlobalProvider";
import { updateProfile } from "../reducers/globalAction";
import { updateUsername } from "../reducers/userReducer";
import currencyList from "../constants/currencyList";
import ACTIONS from "../reducers/actions";

axios.defaults.withCredentials = true;

export default function ProfileForm() {
  const { userState, userDispatch } = useContext(UserContext);
  const { exchangeRateDispatch } = useContext(ExchangeRateContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState(userState?.username);
  const [currency, setCurrency] = useState(userState?.defaultCurrency);
  const [accCurrency, setAccCurrency] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setUsername(event.target.value);

  const handleCurrencyChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setCurrency(event.target.value);

  // Error handlers if username
  // i. is empty
  // ii. submitted is identical to initial state
  // iii. already exists in DB
  const handleUpdateBtn: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("update button clicked");
    const token = localStorage.getItem("token");
    // handling error messages and conditions:
    // i. username is empty
    if (!username) {
      setErrorMessage("Username is required.");
      return;
    }
    // ii. username has changed, run update username
    if (username !== userState?.username) {
      const action = await updateUsername(username, token!);
      userDispatch!(action!);
      // username unique by default, try-catch backend sends error
      if (action.type === ACTIONS.ERROR) {
        setErrorMessage("Choose another username.");
      }
    }

    const action = await updateProfile(username, currency!, token!);
    userDispatch!(action.userAction);
    exchangeRateDispatch!(action.exchangeRateAction);

    if (action.userAction.type === ACTIONS.ERROR) {
      setErrorMessage("Username no longer available.");
      return;
    }
    navigate("/home");
  };

  const handleSwitch = () => {
    setIsEditing(!isEditing);
  };

  const handleCurrency: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setAccCurrency(value);
  };

  return (
    <div>
      <FormControl display="flex" alignItems="end">
        <FormLabel htmlFor="allow-edit" mb="0">
          Update profile?
        </FormLabel>
        <Switch size="md" id="allow-edit" onChange={handleSwitch} />
      </FormControl>
      <br />
      <Box w="100%" p={3} borderWidth="2px" borderRadius="lg" bg="gray.100">
        <form onSubmit={handleUpdateBtn}>
          <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              disabled={!isEditing}
            />
            <br />
          </FormControl>
          <FormControl>
            <FormLabel>Default currency:</FormLabel>
            <Input
              type="text"
              value={currency}
              onChange={handleCurrencyChange}
              disabled={!isEditing}
            />
          </FormControl>
          <br />
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
          <FormControl>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
          <Button
            display="flex"
            alignItems="center"
            colorScheme="teal"
            type="submit"
            disabled={!isEditing}
          >
            Update
          </Button>
        </form>
      </Box>
    </div>
  );
}
