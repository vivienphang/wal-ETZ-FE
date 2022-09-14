import React from "react";

export interface exchangeRateStateInterface {
  AUD?: number;
  CNY?: number;
  HKD?: number;
  IDR?: number;
  JPY?: number;
  MYR?: number;
  SGD?: number;
  THB?: number;
  TWD?: number;
  USD?: number;
  VND?: number;
}

export interface exchangeRateActionInterface {
  type: string;
  payload?: exchangeRateStateInterface;
}

export interface exchangeRateContextInterface {
  exchangeRateState?: exchangeRateStateInterface;
  exchangeRateDispatch?: React.Dispatch<exchangeRateActionInterface>;
}
