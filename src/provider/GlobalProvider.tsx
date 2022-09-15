import React, { createContext, useEffect, useReducer } from "react";
import { userContextInterface } from "../types/userReducerInterface";
import { accountContextInterface } from "../types/accountReducerInterface";
import { childrenInterface } from "../types/providerInterface";
import { initialUserState, userReducer } from "../reducers/userReducer";
import {
  accountReducer,
  initialAccountsState,
} from "../reducers/accountReducer";
import { exchangeRateContextInterface } from "../types/exchangeRateReducerInterface";
import {
  exchangeRateReducer,
  initialExchangeRateState,
} from "../reducers/exchangeRateReducer";

// initialise global states
export const UserContext: React.Context<userContextInterface> =
  createContext(initialUserState);
export const AccountsContext: React.Context<accountContextInterface> =
  createContext(initialUserState);
export const ExchangeRateContext: React.Context<exchangeRateContextInterface> =
  createContext(initialExchangeRateState);

export default function GlobalProvider({ children }: childrenInterface) {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [accountsState, accountsDispatch] = useReducer(
    accountReducer,
    initialAccountsState
  );
  const [exchangeRateState, exchangeRateDispatch] = useReducer(
    exchangeRateReducer,
    initialExchangeRateState
  );
  useEffect(() => {
    console.log(exchangeRateState);
  }, [exchangeRateState]);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      <AccountsContext.Provider value={{ accountsState, accountsDispatch }}>
        <ExchangeRateContext.Provider
          value={{ exchangeRateState, exchangeRateDispatch }}
        >
          {children}
        </ExchangeRateContext.Provider>
      </AccountsContext.Provider>
    </UserContext.Provider>
  );
}
