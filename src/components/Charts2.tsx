import React from "react";
import Filter from "./Filter.tsx";
import BalanceChart from "./BalanceChart.tsx";
import EIPieChart from "./EIPieChart.tsx";

export default function Charts() {
  return (
    <div>
      <h1>Container to house</h1>
      <h3>Filter</h3>
      <Filter />
      <h2>Balance Chart</h2>
      <BalanceChart />
      <h2>Expense/Income PieChart</h2>
      <EIPieChart />
    </div>
  );
}
