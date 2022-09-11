import React, { useContext } from "react";
import { Box, Flex, Button, Heading, HStack, VStack } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AccountsContext, UserContext } from "../provider/GlobalProvider";
import ProfilePic from "../atoms/ProfilePic";
import ProfileForm from "../atoms/UserName";
import { resetState } from "../reducers/userReducer";

export default function Settings() {
  const { userState, userDispatch } = useContext(UserContext);
  const { accountsDispatch } = useContext(AccountsContext);
  // const navigate = useNavigate();
  const handleLogout = async () => {
    const backEndUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("LOGGING OUT");
    localStorage.clear();
    userDispatch!(resetState());
    accountsDispatch!(resetState());
    window.location.href = `${backEndUrl}/auth/logout`;
  };

  return (
    <Box>
      <VStack display="flex" alignItems="center">
        <Heading p="2px" as="h3" size="md">
          Hello,
          {"\u00a0\u00a0"}
          {userState?.username}!
        </Heading>
        <br />
        <HStack>
          <br />
          <ProfilePic />
        </HStack>
        <br />
        <HStack justify="space-around">
          <ProfileForm />
        </HStack>
        <Button colorScheme="teal" onClick={handleLogout}>
          Logout
          {"\u00a0\u00a0"}
          <Box as={FaSignOutAlt} />
        </Button>
      </VStack>
    </Box>
  );
}
