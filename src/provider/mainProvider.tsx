// eslint-disable-next-line no-unused-vars
import React, { useReducer, createContext, useEffect } from "react";

// Import data from axios call
import {
  userData,
  accountsData,
  recordsData,
  getData,
} from "../reducers/initialisingReducers.ts";
import {
  initialUserState,
  usersReducer,
  getUser,
} from "../reducers/usersReducer.ts";
import {
  initialAccountsState,
  accountsReducer,
  getAccounts,
} from "../reducers/accountsReducer.ts";
// Create Context
export const UsersContext = React.createContext();
export const AccountsContext = React.createContext();
export const RecordsContext = React.createContext();

// eslint-disable-next-line react/prop-types
export default function MainProvider({ children }) {
  const [users, dispatchUsers] = useReducer(usersReducer, initialUserState);
  const [accounts, dispatchAccounts] = useReducer(
    accountsReducer,
    initialAccountsState
  );
  // run these functions on every render
  // all the reducers will return the state with the new data from the db
  useEffect(async () => {
    await getData();
    dispatchUsers(getUser());
    dispatchAccounts(getAccounts());
  }, []);
  return (
    <UsersContext.Provider value={{ users, dispatchUsers }}>
      <AccountsContext.Provider value={{ accounts, dispatchAccounts }}>
        {children}
      </AccountsContext.Provider>
    </UsersContext.Provider>
  );
}
