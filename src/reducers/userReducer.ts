/* eslint-disable no-undef */
import axios from "axios";
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
