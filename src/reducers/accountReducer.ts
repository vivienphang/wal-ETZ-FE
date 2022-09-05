import {
  singularAccountInterface,
  accountActionInterface,
} from "../types/accountReducerInterface";
import ACTIONS from "./actions";

export const initialAccountsState = [];

/* reducer */
export function accountReducer(
  accountState: singularAccountInterface[],
  action: accountActionInterface
) {
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return [...action.payload!];
    case ACTIONS.SET:
      return [...action.payload!];
    case ACTIONS.RESET:
      return initialAccountsState;
    default:
      return accountState;
  }
}

/* action creator */
export function resetState() {
  return {
    type: ACTIONS.RESET,
  };
}
