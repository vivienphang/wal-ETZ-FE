import React from "react";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";

// Password change funcitionality

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
