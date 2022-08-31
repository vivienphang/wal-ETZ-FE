import {
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import ProfilePic from "../atoms/ProfilePic";
import UserName from "../atoms/UserName";
import DefaultCurrency from "../atoms/DefaultCurrency";
import Password from "../atoms/Password";

export default function Settings() {
  return (
    <VStack>
      <h1>Settings Page</h1>
      <HStack justify="space-around">
        <ProfilePic />
        <UserName />
      </HStack>
      <DefaultCurrency />
      <Password />
    </VStack>
  );
}
