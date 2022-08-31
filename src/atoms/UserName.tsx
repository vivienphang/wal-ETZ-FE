import React from "react";

import {
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";

export default function UserName() {
  return (
    <div>
      <Editable defaultValue="Name" shadow="md" borderRadius="10px">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
}
