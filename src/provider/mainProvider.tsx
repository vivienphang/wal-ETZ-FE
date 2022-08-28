// eslint-disable-next-line no-unused-vars
import React, { useReducer, createContext, useEffect } from "react";
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
import {
  initialRecordsState,
  recordsReducer,
  getRecords,
} from "../reducers/recordsReducer.ts";

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
  const [records, dispatchRecords] = useReducer(
    recordsReducer,
    initialRecordsState
  );
  // run these functions on every render
  // all the reducers will return the state with the new data from the db
  useEffect(() => {
    getUser();
    getAccounts();
    getRecords();
  }, []);
  return (
    <UsersContext.Provider value={{ users, dispatchUsers }}>
      <AccountsContext.Provider value={{ accounts, dispatchAccounts }}>
        <RecordsContext.Provider value={{ records, dispatchRecords }}>
          {children}
        </RecordsContext.Provider>
      </AccountsContext.Provider>
    </UsersContext.Provider>
  );
}
