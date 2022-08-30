// eslint-disable-next-line no-unused-vars
import React, { ReactNode, useReducer, createContext, useEffect } from "react";
//Importing interfaces
import {
  userReducerInterface,
  accountReducerInterface,
} from "../types/reducerInterface";

import { childrenInterface } from "../types/providerInterface";

// Import data from axios call
import { getData } from "../reducers/initialisingReducers";
import {
  initialUserState,
  usersReducer,
  getUser,
} from "../reducers/usersReducer";
import {
  initialAccountsState,
  accountsReducer,
  getAccounts,
} from "../reducers/accountsReducer";
// Create Context
export const UsersContext = React.createContext<userReducerInterface | null>(
  null
);
// eslint-disable-next-line operator-linebreak
export const AccountsContext =
  React.createContext<accountReducerInterface | null>(null);

// eslint-disable-next-line react/function-component-definition
const MainProvider: React.FC<childrenInterface> = ({ children }) => {
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
};

export default MainProvider;
