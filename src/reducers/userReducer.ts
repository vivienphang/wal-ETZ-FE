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
