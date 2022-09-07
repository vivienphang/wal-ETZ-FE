import axios, { AxiosResponse } from "axios";
import {
  singularAccountInterface,
  accountActionInterface,
} from "../types/accountReducerInterface";
import ACTIONS from "./actions";

axios.defaults.withCredentials = true;

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
// Create function to set acccountState after axios call
// addRecord

export async function addRecord(data: {
  token: string;
  accId: string;
  amount: string;
  name: string;
  comment: string;
  date: string;
  isExpense: boolean;
  acc: string;
  cat: string;
}) {
  console.log("In add Record in accountReducer");
  // Get bearer token for JWT authentication
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const addingRecord = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/records/newRecord`,
    data
  );
  return {
    type: ACTIONS.SET,
    payload: addingRecord,
  };
}
