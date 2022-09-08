/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
// import React, { useContext } from "react";

// import { Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
// import { UserContext } from "../provider/GlobalProvider";
// import { userStateInterface } from "../types/userReducerInterface";

// export default function UserName() {
//   const { userState } = useContext(UserContext);
//   const { username, defaultCurrency } = userState<userStateInterface>;
//   console.log("username:", username);
//   console.log("username:", defaultCurrency);
//   console.log(userState?.username);
//   return (
//     <div>
//       <Editable
//         defaultValue={userState?.username}
//         shadow="md"
//         borderRadius="10px"
//       >
//         <EditablePreview />
//         <EditableInput />
//       </Editable>
//     </div>
//   );
// }

import React, { useContext } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Switch,
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
      <FormControl display="flex" alignItems="end">
        <FormLabel htmlFor="allow-edit" mb="0">
          Update profile?
        </FormLabel>
        <Switch size="md" id="allow-edit" />
      </FormControl>
      <br />
      <Box w="100%" p={3} borderWidth="2px" borderRadius="lg" bg="gray.100">
        <form>
          <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input type="text" value={userState?.username} />
            <br />
            <FormLabel>Default currency:</FormLabel>
            <Input type="text" value={userState?.defaultCurrency} />
          </FormControl>
          <br />
          <Button display="flex" alignItems="center" colorScheme="teal">
            Update
          </Button>
        </form>
      </Box>
    </div>
  );
}
