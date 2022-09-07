import React, { useContext, useEffect } from "react";
import { AccountsContext } from "../provider/GlobalProvider";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { recordPropInterface } from "../types/propInterface";

export default function RecordsList(props: recordPropInterface) {
  const { accountsState } = useContext(AccountsContext);
  // Find the account with the name acc
  const { setRec, rec, acc } = props;

  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account.accName === acc) {
        console.log("Current Account", account.accName);
        setRec!(account.accRecords!);
      }
    });
  }, [acc]);

  const recordsList = rec!.map((record: accountRecordsInterface) => (
    <div key={record._id}>
      <h1>{record.recordCategory}</h1>
      <h1>{record.amount}</h1>
      <h1>{record.recordName}</h1>
      <h1>{new Date(record.recordDate!).toDateString()}</h1>
    </div>
  ));
  useEffect(() => {
    console.log(rec);
  }, [rec]);
  // When account is picked display the records
  // Left styling of data
  return (
    <div>
      <h1>Records List</h1>
      {recordsList}
    </div>
  );
}
