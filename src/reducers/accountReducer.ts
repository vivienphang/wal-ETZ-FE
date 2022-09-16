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

export async function addRecord(data: addRecordInterface) {
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  let addingRecord: AxiosResponse;
  try {
    addingRecord = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/records/newRecord`,
      data,
      config
    );
  } catch (err) {
    return { type: ACTIONS.ERROR };
  }
  return {
    type: ACTIONS.UPDATE,
    payload: [addingRecord.data.data],
  };
}

export async function editRecord(data: addRecordInterface, recId: string) {
  const config = { headers: { Authorization: `Bearer ${data.token}` } };
  let editRecord: AxiosResponse;
  try {
    editRecord = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/records/editRecord`,
      { ...data, recId },
      config
    );
  } catch (err) {
    return { type: ACTIONS.ERROR };
  }
  return {
    type: ACTIONS.UPDATE,
    payload: [editRecord.data.data],
  };
}

export async function deleteRecord(
  recId: string,
  accId: string,
  token: string
) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  let deleteRecord: AxiosResponse;
  try {
    deleteRecord = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/records/deleteRecord`,
      { recId, accId },
      config
    );
  } catch (err) {
    return { type: ACTIONS.ERROR };
  }
  return {
    type: ACTIONS.UPDATE,
    payload: [deleteRecord.data.data],
  };
}
