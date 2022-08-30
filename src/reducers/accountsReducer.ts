import axios from "axios";
import ACTIONS from "./actions";
import { accountsData } from "../reducers/initialisingReducers";

import {
  accountReducerInterface,
  accountActionInterface,
} from "../types/reducerInterface";

export const initialAccountsState = [];

export const accountsReducer = async (
  accountState: accountReducerInterface[],
  action: accountActionInterface
) => {
  switch (action.type) {
    case ACTIONS.GET:
      return accountState;
    case ACTIONS.RETRIEVE:
      return [...action.payload.data];
    default:
      console.log("Need something here");
      return accountState;
  }
};

export const getAccounts = async () => {
  console.log(accountsData);
  return {
    type: ACTIONS.RETRIEVE,
    payload: {
      data: accountsData,
    },
  };
};
