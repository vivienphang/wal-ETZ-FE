import axios, { AxiosResponse } from "axios";
import {
  userActionInterface,
  userStateInterface,
} from "../types/userReducerInterface";
import ACTIONS from "./actions";

export const initialUserState = {};
axios.defaults.withCredentials = true;
/* reducer */
export function userReducer(
  userState: userStateInterface,
  action: userActionInterface
) {
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return { ...action.payload };
    case ACTIONS.SET:
      return { ...action.payload };
    case ACTIONS.RESET:
      return initialUserState;
    default:
      return userState;
  }
}

/* action creator */

export function resetState() {
  return { type: ACTIONS.RESET };
}

export async function updateProfile(
  username: string,
  currency: string,
  token: string
) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const updateData = {
    username,
    currency,
  };
  try {
    const updateUsername = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/updateProfile/`,
      updateData,
      config
    );
    console.log("update username", updateUsername);
  } catch (err) {
    console.log(err);
    return { type: ACTIONS.ERROR };
  }
  return { type: ACTIONS.ERROR };
}
export async function uploadPicture(file: any, token: string) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", `${process.env.BUCKET_NAME}`);
  formData.append("key", file.name);
  let result: AxiosResponse | null = null;
  try {
    result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/updatePicture`,
      formData,
      config
    );
    console.log("update picture", result);
  } catch (err) {
    console.log(err);
    return { type: ACTIONS.ERROR };
  }
  const { defaultCurrency, profilePicture, email, username, _id } =
    result!.data.data;
  return {
    type: ACTIONS.SET,
    payload: { defaultCurrency, profilePicture, email, username, _id },
  };
}
