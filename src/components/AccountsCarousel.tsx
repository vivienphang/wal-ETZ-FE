import React from "react";
import { Flex } from "@chakra-ui/react";

function AccountsCarousel() {
  return (
    <Flex border="solid" justify="space-around" align="center" w="80%" h="20%">
      <Flex w="20%" h="30%" bg="yellow.200" justify="center">
        1
      </Flex>
      <Flex w="20%" h="30%" bg="tomato" justify="center">
        2
      </Flex>
      <Flex w="20%" h="30%" bg="pink.100" justify="center">
        3
      </Flex>
    </Flex>
  );
}

export default AccountsCarousel;
