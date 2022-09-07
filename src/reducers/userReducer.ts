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
// <<<<<<< HEAD
// export const retrieveUser = async () => {
//   console.log("retrieving user data");
//   const config = { headers: { Authorization: `Bearer ${token}` } };
//   const userData = await axios.get(
//     `${process.env.REACT_APP_BACKEND_URL}/users/populateRecords`,
//     config
//   );
//   console.log("this is data:", userData);
//   return {
//     type: ACTIONS.RETRIEVE,
//     payload: { ...userData },
//   };
// };
// =======
export function resetState() {
  return { type: ACTIONS.RESET };
}
