import React from "react";

import {
  Box,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  HStack,
} from "@chakra-ui/react";

export default function DefaultCurrency() {
  return (
    <div>
      <Editable defaultValue="Default Currency" shadow="md" borderRadius="5px">
        <EditablePreview />
        <EditableInput />
      </Editable>
    </div>
  );
}
