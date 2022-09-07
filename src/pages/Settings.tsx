import React, { useContext, useEffect } from "react";
import { UserContext } from "../provider/GlobalProvider";
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
// import ProfilePic from "../atoms/ProfilePic";
import ProfileForm from "../atoms/UserName";
// import DefaultCurrency from "../atoms/DefaultCurrency";
// import Password from "../atoms/Password";
// import getData from "../reducers/globalAction";

export default function Settings() {
  const { userState } = useContext(UserContext);

  return (
    <VStack>
      <Heading>
        Hello,
        {"\u00a0\u00a0"}
        {userState?.username}
      </Heading>
      <HStack justify="space-around">
        <br />
        {/* <ProfilePic /> */}
        <br />
        <ProfileForm />
      </HStack>
      {/* <DefaultCurrency /> */}
      {/* <Password /> */}
    </VStack>
  );
}
