import { accountActionInterface } from "./accountReducerInterface";
import { exchangeRateActionInterface } from "./exchangeRateReducerInterface";
import { userActionInterface } from "./userReducerInterface";

export interface globalActionInterface {
  userAction: userActionInterface;
  accountAction: accountActionInterface;
  exchangeRateAction: exchangeRateActionInterface;
}
