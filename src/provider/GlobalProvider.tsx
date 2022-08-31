import React, { createContext, useEffect, useReducer } from "react";
import { userContextInterface } from "../types/userReducerInterface";
import { accountContextInterface } from "../types/accountReducerInterface";
import { childrenInterface } from "../types/providerInterface";
import { initialUserState, userReducer } from "../reducers/userReducer";
import getData from "../reducers/globalAction";
import {
  accountReducer,
  initialAccountsState,
} from "../reducers/accountReducer";

const UserContext: React.Context<userContextInterface> =
  createContext(initialUserState);
const AccountsContext: React.Context<accountContextInterface> =
  createContext(initialAccountsState);

export default function GlobalProvider({ children }: childrenInterface) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [accountsState, accountsDispatch] = useReducer(
    accountReducer,
    initialAccountsState
  );

  useEffect(() => {
    // todo: pass the id data here
    (async () => {
      const data = await getData("6305beb943e3928b3f62b640");
      console.log(data);
      userDispatch(data.userAction);
      accountsDispatch(data.accountAction);
    })();
  }, []);

  useEffect(() => {
    console.log(userState);
  }, [userState]);
  useEffect(() => {
    console.log(accountsState);
  }, [accountsState]);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <AccountsContext.Provider value={{ accountsState, accountsDispatch }}>
        {children}
      </AccountsContext.Provider>
    </UserContext.Provider>
  );
}
