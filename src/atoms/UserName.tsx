import React, { useContext } from "react";

import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { UserContext } from "../provider/GlobalProvider";

export default function ProfileForm() {
  const { userState } = useContext(UserContext);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="check button"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="close button"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="edit button"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <div>
      <Editable
        textAlign="center"
        defaultValue={userState?.username}
        fontSize="2xl"
        isPreviewFocusable={false}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input variant="outline" value={userState?.username} />
        <EditableControls />
      </Editable>
      <div>
        <Editable value={userState?.username} shadow="md" borderRadius="10px">
          <EditablePreview />
          <EditableInput />
        </Editable>
      </div>
    </div>
  );
}
