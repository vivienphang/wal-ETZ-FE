import React from "react";
import { Box, HStack, Stack, VStack } from "@chakra-ui/react";

const AccountsCarousel = () => {
  return (
    <Stack direction={["row"]} spacing="24px">
      <Box w="40px" h="40px" bg="yellow.200">
        1
      </Box>
      <Box w="40px" h="40px" bg="tomato">
        2
      </Box>
      <Box w="40px" h="40px" bg="pink.100">
        3
      </Box>
    </Stack>
  );
};

export default AccountsCarousel;
