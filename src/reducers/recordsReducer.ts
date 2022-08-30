import axios from "axios";
import ACTIONS from "./actions";

axios.defaults.withCredentials = true;
const backEndUrl = `${process.env.REACT_APP_BACKEND_URL}`;

export const initialRecordsState = [];

export const recordsReducer = async (
  state: any,
  action: { type: any; payload: any }
) => {
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

export const getRecords = async () => {
  let recordsData;
  const data = {
    id: "6305beb943e3928b3f62b640",
  };
  const url = `${backEndUrl}/users/populateAccounts`;
  try {
    const allData = await axios.post(url, data);
    recordsData = allData.data.accounts;
  } catch (err) {
    console.log("Error in get Records Data", err);
  }
  return {
    type: ACTIONS.RETRIEVE,
    payload: {
      data: recordsData,
    },
  };
};
