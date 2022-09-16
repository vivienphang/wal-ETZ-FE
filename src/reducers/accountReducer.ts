/* eslint-disable prefer-destructuring */
import axios, { AxiosResponse } from "axios";
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
  let accCopy: singularAccountInterface[];
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return [...action.payload!];
    case ACTIONS.UPDATE:
      accCopy = [...accountState];
      console.log("In actions update accounts reducer");
      console.log(action.payload);
      accountState.forEach((account, index) => {
        if (action.payload![0]._id === account._id) {
          accCopy[index] = action.payload![0];
        }
      });
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

export async function addRecord(data: addRecordInterface, photo: File) {
  console.log("In add Record in accountReducer");
  // Get bearer token for JWT authentication
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  const formData = new FormData();
  formData.append("file", photo);
  formData.append("bucket", `${process.env.BUCKET_NAME}`);
  formData.append("key", photo.name);
  let result: AxiosResponse | null = null;
  try {
    result = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/records/addReceiptS3`,
      formData,
      config
    );
    console.log("update picture", result);
  } catch (err) {
    console.log(err);
    return { type: ACTIONS.ERROR };
  }
  console.log(result?.data.data);
  const photoLink = result?.data.data;

  const addingRecord = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/records/newRecord`,
    { ...data, recordPhoto: photoLink },
    config
  );
  console.log(addingRecord);
  return {
    type: ACTIONS.UPDATE,
    payload: [addingRecord.data.updateAccount],
  };
}
