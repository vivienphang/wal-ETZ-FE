import axios from "axios";
import ACTIONS from "./actions.ts";
import { userData } from "../reducers/initialisingReducers.ts";

axios.defaults.withCredentials = true;

export const initialUserState = {};
// Getting all the user data from the backend
// This is the state that we are using in REACT
// Actual data is from the functions below
export const usersReducer = async (state, action) => {
  switch (action.type) {
    case ACTIONS.GET:
      return state;
    case ACTIONS.RETRIEVE:
      return { ...action.payload };
    default:
      console.log("Need something here");
      return state;
  }
};
export const getUser = async () => {
  console.log(userData);
  return {
    type: ACTIONS.RETRIEVE,
    payload: {
      data: userData,
    },
  };
};
