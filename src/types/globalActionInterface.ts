import { accountActionInterface } from "./accountReducerInterface";
import { userActionInterface } from "./userReducerInterface";

export interface globalActionInterface {
  userAction: userActionInterface;
  accountAction: accountActionInterface;
}
