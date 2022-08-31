import React, { useContext } from "react";

import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { UserContext } from "../provider/GlobalProvider";

export default function UserName() {
  const { userState } = useContext(UserContext);
  console.log(userState);
  console.log(userState?.username);
  return (
    <div>
      <Editable
        defaultValue={userState?.username}
        shadow="md"
        borderRadius="10px"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
}
