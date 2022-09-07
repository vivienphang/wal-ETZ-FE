import React from "react";
import { accountRecordsInterface } from "./accountReducerInterface";

export interface recordPropInterface {
  acc?: string;
  setAcc?: React.Dispatch<React.SetStateAction<string>>;
  rec?: accountRecordsInterface[];
  setRec?: React.Dispatch<React.SetStateAction<accountRecordsInterface[]>>;
}
