import React, { useEffect } from "react";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { recordsListPropInterface } from "../types/propInterface";

export default function RecordsList(props: recordsListPropInterface) {
  // Find the account with the name acc
  const { filteredRec } = props;

<<<<<<< HEAD
  const recordsList = filteredRec!.map((record: accountRecordsInterface) => (
=======
  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account._id === acc) {
        console.log("Current Account", account.accName);
        setRec!(account.accRecords!);
      }
    });
  }, [acc]);

  const recordsList = rec!.map((record: accountRecordsInterface) => (
>>>>>>> f885d6f9870a7c9710bb0bcf3a6a8337917b0df0
    <div key={record._id}>
      <h1>{record.recordCategory}</h1>
      <h1>{record.amount}</h1>
      <h1>{record.recordName}</h1>
      <h1>{new Date(record.recordDate!).toDateString()}</h1>
    </div>
  ));
  useEffect(() => {
    console.log(filteredRec);
  }, [filteredRec]);
  // When account is picked display the records
  return (
    <div>
      <h1>Records List</h1>
      {recordsList}
    </div>
  );
}
