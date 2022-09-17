/* eslint-disable jsx-a11y/media-has-caption */
import {
  Box,
  FormControl,
  FormHelperText,
  StackDivider,
  VStack,
  Center,
  Button,
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { addPhotoUrlPropInterface } from "../types/propInterface";

export default function Camera(props: addPhotoUrlPropInterface) {
  const { setIsPhotoUploaded, onCameraClose } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const closeStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        const video = videoRef.current || null;
        video!.srcObject = stream;
        const track = stream.getVideoTracks()[0];
        track.enabled = false;
        track.stop();
      })
      .catch((err) => {
        console.error(err);
      });
    onCameraClose!();
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        const video = videoRef.current || null;
        video!.srcObject = stream;
        video!.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = async () => {
    const width = 426;
    const height = 240;

    const video = videoRef.current;
    const photo = photoRef.current;
    photo!.width = width;
    photo!.height = height;

    const ctx = photo!.getContext("2d");
    ctx!.drawImage(video!, 0, 0, width, height);
    setHasPhoto(true);
    const link = document.createElement("a");
    link.download = "download.png";
    link.href = photo!.toDataURL();
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
            <Button onClick={closeStream}>Close Camera</Button>
          </Center>
        </div>
      </div>
    </VStack>
  );
}
