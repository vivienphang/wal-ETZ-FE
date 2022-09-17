import React from "react";

export interface exchangeRateStateInterface {
  [currencyCode: string]: number;
}

export interface exchangeRateActionInterface {
  type: string;
  payload?: exchangeRateStateInterface;
}

export interface exchangeRateContextInterface {
  exchangeRateState?: exchangeRateStateInterface;
  exchangeRateDispatch?: React.Dispatch<exchangeRateActionInterface>;
}
