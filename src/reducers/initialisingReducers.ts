/* eslint-disable import/no-mutable-exports */
import axios from "axios";

axios.defaults.withCredentials = true;

// Var for all data
export let userData: any;
export let accountsData: any;

// Getting all the data
export const getData = async () => {
  console.log("Running in initialising Reducers");
  const backEndUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = {
    id: "6305beb943e3928b3f62b640",
  };
  const url = `${backEndUrl}/users/populateRecords`;
  const data = await axios.post(url, userId);
  userData = {
    // eslint-disable-next-line no-underscore-dangle
    id: data.data.data._id,
    defaultCurrency: data.data.data.defaultCurrency,
    email: data.data.data.email,
    friends: data.data.data.friends,
    friendsRequest: data.data.data.friendsRequest,
  };
  console.log(data);
  accountsData = data.data.data.accounts.forEach((account) => {
    return account;
  });
  console.log(accountsData);
};
