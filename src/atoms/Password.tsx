import React from "react";
import {
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";

export default function Password() {
  return (
    <div>
      <Editable defaultValue="Password" shadow="md" borderRadius="5px">
        <EditablePreview />
        <EditableInput type="password" />
      </Editable>
    </div>
  );
}
