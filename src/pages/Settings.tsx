import React, { useContext } from "react";
import {
  Heading,
  // Box,
  // Editable,
  // EditableInput,
  // EditableTextarea,
  // EditablePreview,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { UserContext } from "../provider/GlobalProvider";
import ProfilePic from "../atoms/ProfilePic";
import ProfileForm from "../atoms/UserName";
// import DefaultCurrency from "../atoms/DefaultCurrency";
// import Password from "../atoms/Password";

export default function Settings() {
  const { userState } = useContext(UserContext);

  return (
    <VStack>
      <Heading p="2px" as="h3" size="md">
        Hello,
        {"\u00a0\u00a0"}
        {userState?.username}!
      </Heading>
      <br />
      <HStack justify="space-around">
        <br />
        <ProfilePic />
      </HStack>
      <br />
      <HStack justify="space-around">
        <ProfileForm />
      </HStack>
      {/* <DefaultCurrency /> */}
      {/* <Password /> */}
    </VStack>
  );
}
