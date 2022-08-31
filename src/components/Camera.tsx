/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */
// To read reciepts
import React, { useRef, useEffect, useState } from "react";

export default function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1000 },
      })
      .then((stream) => {
        const video = videoRef.current;
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

    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="camera">
      <video ref={videoRef} />
      <button onClick={takePhoto}>SNAP</button>
      <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef} />
        <button onClick={closePhoto}>CLOSE</button>
      </div>
    </div>
  );
}
