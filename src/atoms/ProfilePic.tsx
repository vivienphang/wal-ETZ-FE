import React, { useContext, useState } from "react";
import { Avatar, Center, HStack, Input, WrapItem } from "@chakra-ui/react";
import { UserContext } from "../provider/GlobalProvider";
import { uploadPicture } from "../reducers/userReducer";
import colorList from "../constants/colorList";

export default function UploadImage() {
  const { userState, userDispatch } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileInput = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const token = localStorage.getItem("token");
    if (!file) {
      setErrorMessage("You need to select a file.");
      return;
    }
    const action = await uploadPicture(file, token!);
    userDispatch!(action!);
  };

  return (
    <HStack>
      <label htmlFor="photo-upload">
        <Center>
          <WrapItem>
            <form>
              <Avatar
                bg={colorList.buttonPrimary}
                size="xl"
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
              <Input
                id="photo-upload"
                type="file"
                onChange={handleFileInput}
                sx={{ display: "none" }}
              />
            </form>
          </WrapItem>
        </Center>
      </label>
      <p>{errorMessage}</p>
    </HStack>
  );
}
