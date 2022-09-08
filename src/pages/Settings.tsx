import React, { useContext } from "react";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { UserContext } from "../provider/GlobalProvider";
import ProfilePic from "../atoms/ProfilePic";
import ProfileForm from "../atoms/UserName";
// import DefaultCurrency from "../atoms/DefaultCurrency";

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
        <ProfilePic />
        <br />
        <ProfileForm />
      </HStack>
      {/* <DefaultCurrency /> */}
    </VStack>
  );
}
