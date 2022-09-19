import React, { useContext, useEffect, useState } from "react";

import { Checkbox } from "@chakra-ui/react";
import { UserContext } from "../provider/GlobalProvider";
// import colorList from "../constants/colorList";

function notification() {
  const { userState } = useContext(UserContext);
  // if checkbox clicked, handle permission true
  const stringToBoolean = (stringValue: string | null | undefined) => {
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
      case null:
      case undefined:
        return false;

      default:
        return JSON.parse(stringValue!);
    }
  };
  const checkPerm = stringToBoolean(localStorage.getItem("permission"));
  const [check, setCheck] = useState(checkPerm);

  const showNotification = () => {
    // use let as this will change
    const notificationOpts = {
      body: `Hello, ${userState?.username}! You've enabled notifications.`,
      icon: "./images/aureus.png",
    };
    // give logic for notifications
    new Notification("New Notification", notificationOpts);
  };
  // Getting notification permission

  const handlePermissionCheck = () => {
    console.log("checkbox clicked");
    setCheck(!check);
    localStorage.setItem("permission", `${!check}`);
  };

  useEffect(() => {
    if (check === true) {
      if (window.Notification) {
        // Managing Permission
        if (Notification.permission === "granted") {
          showNotification();
        } else {
          Notification.requestPermission((permission) => {
            if (permission === "granted") {
              showNotification();
            }
          });
        }
      }
    }
  }, [check]);

  return (
    <Checkbox isChecked={check} onChange={handlePermissionCheck} p={6}>
      Allow notifications
    </Checkbox>
  );
}

export default notification;
