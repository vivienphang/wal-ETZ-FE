/* eslint-disable prefer-destructuring */
import axios from "axios";
import {
  singularAccountInterface,
  accountActionInterface,
  addRecordInterface,
} from "../types/accountReducerInterface";
import ACTIONS from "./actions";

axios.defaults.withCredentials = true;

export const initialAccountsState = [];

/* reducer */
export function accountReducer(
  accountState: singularAccountInterface[],
  action: accountActionInterface
) {
  const accCopy = [...accountState];
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return [...action.payload!];
    case ACTIONS.UPDATE:
      // Check accountState for this accountId
      // action.payload.updateaccount.accountiD
      // foreach if === this.accId{
      // replace
      console.log("In actions update accounts reducer");
      console.log(action.payload);
      accountState.forEach((account, index) => {
        if (action.payload![0]._id === account._id) {
          accCopy[index] = action.payload![0];
        }
      });
      // Find the id of old account and update it
      return [...accCopy];
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

export async function addRecord(data: addRecordInterface) {
  console.log("In add Record in accountReducer");
  // Get bearer token for JWT authentication
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const addingRecord = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/records/newRecord`,
    data,
    config
  );
  console.log(addingRecord);
  return {
    type: ACTIONS.UPDATE,
    payload: [addingRecord.data.updateAccount],
  };
}
