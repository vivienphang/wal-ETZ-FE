import React, { useContext } from "react";

import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import { UserContext } from "../provider/GlobalProvider";

export default function DefaultCurrency() {
  const { userState } = useContext(UserContext);
  console.log(userState);
  console.log(userState?.defaultCurrency);
  // Default curr state
  return (
    <div>
      <Editable
        defaultValue={userState?.defaultCurrency}
        shadow="md"
        borderRadius="5px"
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
}
