import {
  userActionInterface,
  userStateInterface,
} from "../types/userReducerInterface";
import ACTIONS from "./actions";

export const initialUserState = {};

/* reducer */
export function userReducer(
  userState: userStateInterface,
  action: userActionInterface
) {
  console.log(action);
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return { ...action.payload };
    case ACTIONS.SET:
      return { ...action.payload };
    default:
      return userState;
  }
}

/* action creator */
