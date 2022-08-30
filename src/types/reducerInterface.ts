export interface userReducerInterface {
  id: string;
  defaultCurrency: string;
  email: string;
  friends: [object];
  friendsRequest: [object];
}

export interface accountReducerInterface {
  id: string;
  accName: string;
  accCurrency: string;
  accRecords: [
    {
      id: string;
      amount: number;
      isExpense: boolean;
      recordName: string;
      recordCategory: string;
      recordDate: Date;
    }
  ];
}

export interface userActionInterface {
  type: string;
  payload?: {
    data?: userReducerInterface;
  };
}

export interface accountActionInterface {
  type: string;
  payload: {
    data: [accountActionInterface];
  };
}
