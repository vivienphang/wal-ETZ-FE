/* eslint-disable jsx-a11y/media-has-caption */

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  StackDivider,
  VStack,
  Center,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState, useContext } from "react";
import { addPhotoUrlPropInterface } from "../types/propInterface";
import { addReceiptS3 } from "../reducers/accountReducer";
import { AccountsContext } from "../provider/GlobalProvider";
import { MdPhotoCamera } from "react-icons/md";

export default function Camera(props: addPhotoUrlPropInterface) {
  const { isPhotoUploaded, setIsPhotoUploaded } = props;
  const { accountsDispatch } = useContext(AccountsContext);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1000 },
      })
      .then((stream) => {
        const video = videoRef.current || null;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    const video = videoRef.current;
    const photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    const ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };
  const closePhoto = () => {
    const photo = photoRef.current;
    const ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };
  const usePhoto = async () => {
    const token = localStorage.getItem("token");
    const photo = photoRef.current;
    const ctx = photo.getContext("2d");
    const link = document.createElement("a");
    link.download = "download.png";
    link.href = photo.toDataURL();
    const blob = await (await fetch(link.href)).blob();
    const file = new File([blob], `receipt${Date.now()}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
    console.log(file);
    if (!file) {
      setErrorMessage("You need to select a file.");

      return;
    }
    setIsPhotoUploaded(file);
    // const action = await addReceiptS3(file, token!);
    // accountsDispatch!(action);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <VStack divider={<StackDivider />} spacing={10}>
      <div className="camera">
        <video ref={videoRef} />
        <div className={`result${hasPhoto ? "hasPhoto" : ""}`}>
          <canvas ref={photoRef} />
          <FormControl>
            <FormHelperText>{errorMessage}</FormHelperText>
          </FormControl>
          <Center>
            <Box
              as={MdPhotoCamera}
              color="gray.300"
              size="50px"
              onClick={takePhoto}
            />
          </Center>
          {/* <Button onClick={takePhoto}>Snap</Button> */}
          {/* {`result${
            hasPhoto ? (
              <Button onClick={usePhoto}>Save</Button>
            ) : (
              <Button onClick={usePhoto} disabled={true}>
                Save
              </Button>
            )
          }`} */}
          <Button onClick={closePhoto}>Cancel</Button>
          <Button onClick={usePhoto}>Save</Button>
        </div>
      </div>
    </VStack>
  );
}
