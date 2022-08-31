import React from "react";
// Take data from users in userState

import {
  Avatar,
  // AvatarBadge,
  // AvatarGroup,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";

export default function ProfilePic() {
  // Pass a src params to be used for the Avatar
  return (
    <div>
      <Wrap>
        <WrapItem>
          <Avatar
            bg="teal.500"
            // For No Picture icon
            // icon={<AiOutlineUser fontSize="1.5rem" />} />
            size="lg"
            name="Mayank"
            src="https://bit.ly/dan-abramov"
          />
        </WrapItem>
      </Wrap>
    </div>
  );
}
