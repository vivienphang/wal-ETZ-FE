// import { AddIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
// import {
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
// } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../provider/GlobalProvider";
import { Avatar, HStack, WrapItem } from "@chakra-ui/react";

import { MdPhotoCamera } from "react-icons/md";
import { Action } from "history";
import { uploadPicture } from "../reducers/userReducer";

export default function UploadImage() {
  const { userState, userDispatch } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [defaultPicture, setDefaultPicture] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const token = localStorage.getItem("token");
  // const config = { headers: { Authorization: `Bearer ${token}` } };
  const handleFileInput = async (e: any) => {
    // setSelectedFile(e.target.files[0]);
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    const token = localStorage.getItem("token");
    const userId = userState?._id;
    console.log("user id:", userId);
    if (!file) {
      setErrorMessage("You need to select a file.");

      return;
    }
    // if (!file && username === userState?.username) {
    //   setDefaultPicture(userState?.username);
    // }
    const action = await uploadPicture(file, token!);
    userDispatch!(action!);
  };

  return (
    <HStack>
      <label htmlFor="photo-upload">
        <WrapItem>
          <form>
            <Avatar
              bg="teal.500"
              size="lg"
              name={
                userState?.profilePicture
                  ? userState?.profilePicture
                  : userState?.username
              }
              src={
                userState?.profilePicture
                  ? `${userState?.profilePicture}`
                  : undefined
              }
            />
          </form>
        </WrapItem>
        <input id="photo-upload" type="file" onChange={handleFileInput} />
      </label>
      {/* <button onClick={() => handleUploadBtn(selectedFile)}>
        {" "}
        Upload to S3
      </button> */}

      <p>{errorMessage}</p>
    </HStack>
  );
}
