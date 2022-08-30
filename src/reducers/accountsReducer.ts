import axios from "axios";
import ACTIONS from "./actions.ts";
import { accountsData } from "../reducers/initialisingReducers.ts";

axios.defaults.withCredentials = true;

export const initialAccountsState = [];

export const accountsReducer = async (state, action) => {
  switch (action.type) {
    case ACTIONS.GET:
      return state;
    case ACTIONS.RETRIEVE:
      return [...action.payload];
    default:
      console.log("Need something here");
      return state;
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
