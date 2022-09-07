import React, { useContext, useEffect } from "react";
import { AccountsContext } from "../provider/GlobalProvider";

export default function RecordsList({ acc, rec, setRec }) {
  const { accountsState } = useContext(AccountsContext);
  // Find the account with the name acc

  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account.accName === acc) {
        console.log("Current Account", account.accName);
        setRec(account.accRecords);
      }
    });
  }, [acc]);

  const recordsList = rec.map((record: any) => (
    // eslint-disable-next-line no-underscore-dangle
    <div key={record._id}>
      <h1>{record.recordCategory}</h1>
      <h1>{record.amount.$numberDecimal}</h1>
      <h1>{record.recordName}</h1>
      <h1>{record.recordDate}</h1>
    </div>
  ));
  useEffect(() => {
    console.log(rec);
  }, [rec]);
  // When account is picked display the records
  /////////////// Left styling of data
  return (
    <div>
      <h1>Records List</h1>
      {recordsList}
    </div>
  );
}
