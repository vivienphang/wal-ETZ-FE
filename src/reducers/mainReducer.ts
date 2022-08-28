import axios from "axios";
import ACTIONS from "./actions.ts";

axios.defaults.withCredentials = true;
const backEndUrl = `${process.env.BACK_END_URL}`;

// Getting all the user data from the backend

// This is the state that we are using in REACT
// Actual data is from the functions below
export default usersReducer = async (state, action) => {
  switch (action.type) {
    case ACTIONS.GET:
      return state;
    case ACTIONS.ADD:
      return [...action.payload];
    default:
      console.log("Need something here");
  }
};

export const getOne = async () => {
  // Get id from cookie
  const data = await axios.get();
};
