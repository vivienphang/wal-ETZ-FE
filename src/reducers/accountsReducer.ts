import axios from "axios";
import ACTIONS from "./actions.ts";

axios.defaults.withCredentials = true;
const backEndUrl = `${process.env.REACT_APP_BACKEND_URL}`;

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
  let accountsData;
  const data = {
    id: "6305beb943e3928b3f62b640",
  };
  const url = `${backEndUrl}/users/populateAccounts`;
  try {
    const allData = await axios.post(url, data);
    accountsData = allData.data.accounts;
  } catch (err) {
    console.log("Error in getAccountsData", err);
  }
  return {
    type: ACTIONS.RETRIEVE,
    payload: {
      data: accountsData,
    },
  };
};
