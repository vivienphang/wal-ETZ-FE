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

import React, { useContext, useEffect } from "react";

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
import getData from "../reducers/globalAction";

export default function ProfileForm() {
  const { userState, userDispatch } = useContext(UserContext);

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    (async () => {
      const id = localStorage.getItem("id");
      if (id) {
        const data = await getData(id);
        const { username, defaultCurrency, password } = data.userAction.payload;
        console.log(
          "###this is data.userAction.payload",
          username,
          defaultCurrency,
          password
        );
        userDispatch!(data.userAction);
        return null;
      }
    })();
  }, []);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={userState?.username}
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={userState?.username} />
      <EditableControls />
    </Editable>
  );
}
