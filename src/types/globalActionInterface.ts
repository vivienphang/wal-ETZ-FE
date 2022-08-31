import { accountActionInterface } from "./accountReducerInterface";
import { userActionInterface } from "./userReducerInterface";

// todo: add accounts action interface
export interface globalActionInterface {
  userAction: userActionInterface;
  accountAction: accountActionInterface;
}
