import React, { useEffect } from "react";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { recordsListPropInterface } from "../types/propInterface";

export default function RecordsList(props: recordsListPropInterface) {
  // Find the account with the name acc
  const { filteredRec } = props;

  const recordsList = filteredRec.map((record: accountRecordsInterface) => (
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

  return (
    <div>
      <h1>Records List</h1>
      {recordsList}
    </div>
  );
}
