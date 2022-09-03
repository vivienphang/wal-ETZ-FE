import React, { createContext, useReducer } from "react";
import { userContextInterface } from "../types/userReducerInterface";
import { accountContextInterface } from "../types/accountReducerInterface";
import { childrenInterface } from "../types/providerInterface";
import { initialUserState, userReducer } from "../reducers/userReducer";
import {
  accountReducer,
  initialAccountsState,
} from "../reducers/accountReducer";

// initialise global states
export const UserContext: React.Context<userContextInterface> =
  createContext(initialUserState);
export const AccountsContext: React.Context<accountContextInterface> =
  createContext(initialUserState);

export default function GlobalProvider({ children }: childrenInterface) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [accountsState, accountsDispatch] = useReducer(
    accountReducer,
    initialAccountsState
  );

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <AccountsContext.Provider value={{ accountsState, accountsDispatch }}>
        {children}
      </AccountsContext.Provider>
    </UserContext.Provider>
  );
}
