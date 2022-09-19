import React, { useContext } from "react";
import { Box, Button, Center, Heading, HStack, Flex } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { AccountsContext, UserContext } from "../provider/GlobalProvider";
import ProfilePic from "../atoms/ProfilePic";
import ProfileForm from "../atoms/UserName";
import { resetState } from "../reducers/userReducer";
import NoficationPermission from "../components/notificationPerm";
import colorList from "../constants/colorList";

export default function Settings() {
  const { userState, userDispatch } = useContext(UserContext);
  const { accountsDispatch } = useContext(AccountsContext);

  const handleLogout = async () => {
    const backEndUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("LOGGING OUT");
    localStorage.clear();
    userDispatch!(resetState());
    accountsDispatch!(resetState());
    window.location.href = `${backEndUrl}/auth/logout`;
  };

  return (
    <Flex
      display="flex"
      h="95%"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box display="flex" alignItems="center" flexDirection="column">
        <Center>
          <Heading p="2px" as="h3" size="md" color={colorList.textColor}>
            Hello,
            {` ${userState?.username}`}!
          </Heading>
        </Center>
        <HStack mt={5}>
          <br />
          <ProfilePic />
        </HStack>
        <br />
        <HStack>
          <ProfileForm />
        </HStack>
        <HStack>
          <NoficationPermission />
        </HStack>
      </Box>
      <Button
        bg={colorList.buttonPrimary}
        onClick={handleLogout}
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
        form="login-form"
      >
        Logout
        {"\u00a0\u00a0"}
        <Box as={FaSignOutAlt} />
      </Button>
    </Flex>
  );
}
