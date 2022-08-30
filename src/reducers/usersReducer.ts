import axios from "axios";
import ACTIONS from "./actions.ts";

axios.defaults.withCredentials = true;
const backEndUrl = `${process.env.REACT_APP_BACKEND_URL}`;

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
  // Get id from cookie
  // User id wil be saved in req.cookies
  let userData: any;
  const data = {
    id: "6305beb943e3928b3f62b640",
  };
  // get from local storage
  // const { id } = localstorage.getitem("id");
  const url = `${backEndUrl}/users/populateAccounts`;
  try {
    const allData = await axios.post(url, data);
    userData = {
      id: allData.data.id,
      defaultCurrency: allData.data.defaultCurrency,
      email: allData.data.email,
      friends: allData.data.friends,
      friendsRequest: allData.data.friendsRequest,
    };
  } catch (err) {
    console.log("Error in getOneUser UsersReducer", err);
  }
  return {
    type: ACTIONS.RETRIEVE,
    payload: {
      data: userData,
    },
  };
};
