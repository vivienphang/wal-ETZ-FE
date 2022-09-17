import {
  exchangeRateActionInterface,
  exchangeRateStateInterface,
} from "../types/exchangeRateReducerInterface";
import ACTIONS from "./actions";

export const initialExchangeRateState = {};

export function exchangeRateReducer(
  exchangeRateState: exchangeRateStateInterface,
  action: exchangeRateActionInterface
) {
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return { ...action.payload };
    case ACTIONS.SET:
      return { ...action.payload };
    case ACTIONS.RESET:
      return initialExchangeRateState;
    default:
      return exchangeRateState;
  }
}

export function resetState() {
  return { type: ACTIONS.RESET };
}
