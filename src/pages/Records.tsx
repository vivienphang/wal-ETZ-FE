import React, { useState, useContext, useEffect } from "react";
import AccountList from "../components/AccountList";
import Filter from "../components/Filter";
import RecordsList from "../components/RecordsList";
import { AccountsContext } from "../provider/GlobalProvider";
import { accountRecordsInterface } from "../types/accountReducerInterface";
import { filterInterface } from "../types/filterInterface";

export default function Records() {
  // init startDate is: 1st Jan 1700
  // init endDate is : 31st Dec 3000
  const initFilterState = {
    startDate: new Date(1700, 1, 1),
    endDate: new Date(3000, 12, 31),
    viewExpense: false,
    viewIncome: false,
  };

  const [acc, setAcc] = useState("");
  const [rec, setRec] = useState<accountRecordsInterface[]>([]);
  const [filteredRec, setFilteredRec] = useState<accountRecordsInterface[]>([]);
  const [filters, setFilters] = useState<filterInterface>(initFilterState);

  const { accountsState } = useContext(AccountsContext);

  useEffect(() => {
    accountsState?.forEach((account) => {
      if (account._id === acc) {
        console.log("Current Account", account.accName);
        setRec!(account.accRecords!);
      }
    });
  }, [acc]);

  useEffect(() => {
    const preFilteredRec = setFilteredRec();
  }, [rec, filters]);

  return (
    <div>
      <h1>This is the page with all money records</h1>
      <AccountList acc={acc} setAcc={setAcc} />
      <Filter filters={filters} setFilters={setFilters} />
      <RecordsList filteredRec={filteredRec} />
    </div>
  );
}
