import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  // IconButton,
  Input,
  Switch,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../provider/GlobalProvider";
// import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

axios.defaults.withCredentials = true;

export default function ProfileForm() {
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState(userState?.username);
  const [currency, setCurrency] = useState(userState?.defaultCurrency);

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setUsername(event.target.value);

  const handleCurrencyChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setCurrency(event.target.value);

  // Input error handlers
  const usernameError = username === "";
  const currencyError = currency === "";
  // Update checks
  // i. if username already exists in DB
  // ii. regex conditions for username
  // iii. findIdAndUpdate, returnDocument: "after"
  const handleUpdateBtn: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("update button clicked");
    const updateData = {
      username,
      currency,
    };
    if (username) {
      try {
        const id: any = userState?._id;
        console.log("THIS IS ID:", id);
        const updateUsername = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/${id}`,
          updateData
        );
        console.log("update username", updateUsername);
        navigate("/home");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <FormControl display="flex" alignItems="end">
        <FormLabel htmlFor="allow-edit" mb="0">
          Update profile?
        </FormLabel>
        <Switch size="md" id="allow-edit" />
      </FormControl>
      <br />
      <Box w="100%" p={3} borderWidth="2px" borderRadius="lg" bg="gray.100">
        <form>
          <FormControl isInvalid={usernameError}>
            <FormLabel>Username:</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            {!usernameError ? (
              <FormHelperText />
            ) : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
            <br />
          </FormControl>
          <FormControl isInvalid={currencyError}>
            <FormLabel>Default currency:</FormLabel>
            <Input
              type="text"
              value={currency}
              onChange={handleCurrencyChange}
            />
            {!currencyError ? (
              <FormHelperText />
            ) : (
              <FormErrorMessage>Default currency is required.</FormErrorMessage>
            )}
          </FormControl>
          <br />
          <Button
            display="flex"
            alignItems="center"
            colorScheme="teal"
            onClick={handleUpdateBtn}
          >
            Update
          </Button>
        </form>
      </Box>
    </div>
  );
}
