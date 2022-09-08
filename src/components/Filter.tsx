import React, { useEffect, useState } from "react";
import { filterPropInterface } from "../types/propInterface";

export default function Filter(props: filterPropInterface) {
  const { rec, setFilteredRec } = props;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewExpense, setViewExpense] = useState(false);
  const [viewIncome, setViewIncome] = useState(false);

  useEffect(() => {
    console.log("testing");
  }, [startDate, endDate, viewExpense, viewIncome]);
  return (
    <div>
      <h1>Filter component</h1>
    </div>
  );
}
