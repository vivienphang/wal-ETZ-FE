import React from "react";

export interface accountRecordsInterface {
  _id?: string;
  amount?: string;
  isExpense?: boolean;
  recordName?: string;
  recordComment?: string;
  recordCategory?: string;
  recordPhoto?: string;
  recordDate?: Date | string;
}

export interface singularAccountInterface {
  _id?: string;
  accCurrency?: string;
  accRecords?: accountRecordsInterface[];
  accName?: string;
}

export interface accountActionInterface {
  type?: string;
  payload?: singularAccountInterface[];
}

export interface accountContextInterface {
  accountsState?: singularAccountInterface[];
  accountsDispatch?: React.Dispatch<accountActionInterface>;
}
