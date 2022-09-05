import axios, { AxiosResponse } from "axios";
import {
  singularAccountInterface,
  accountRecordsInterface,
} from "../types/accountReducerInterface";
import { globalActionInterface } from "../types/globalActionInterface";
import ACTIONS from "./actions";

axios.defaults.withCredentials = true;

const status = {
  POPULATE_FAIL: "failed to populate user data",
  POPULATE_SUCCESS: "populated user data",
};

export default async function getData(token: string) {
  let userData: AxiosResponse | null = null;
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    userData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/populateRecords`,
      config
    );
  } catch (err) {
    console.log("can't get user data by axios");
    return "error";
  }

  let globalAction: globalActionInterface;
  if (userData?.data.status !== status.POPULATE_SUCCESS) {
    globalAction = {
      userAction: { type: ACTIONS.ERROR },
      accountAction: { type: ACTIONS.ERROR },
    };
  } else {
    console.log(userData?.data);
    const {
      _id,
      defaultCurrency,
      email,
      username,
      friends,
      friendRequests,
      accounts,
    } = userData.data.data;
    const accountsArray: singularAccountInterface[] = [];
    accounts.forEach((account: singularAccountInterface) => {
      const recordsArray: accountRecordsInterface[] = [];
      if (account.accRecords) {
        account.accRecords.forEach((record: accountRecordsInterface) => {
          recordsArray.push(record);
        });
      }
      const { _id: accId, accCurrency, accName } = account;
      accountsArray.push({
        _id: accId,
        accCurrency,
        accRecords: recordsArray,
        accName,
      });
    });
    globalAction = {
      userAction: {
        type: ACTIONS.RETRIEVE,
        payload: {
          _id,
          defaultCurrency,
          email,
          username,
          friends,
          friendRequests,
        },
      },
      accountAction: {
        type: ACTIONS.RETRIEVE,
        payload: accountsArray,
      },
    };
  }

  return globalAction;
}
