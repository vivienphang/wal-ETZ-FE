import React from "react";
import { Select, Divider } from "@chakra-ui/react";

import { expenseCategories, incomeCategories } from "../constants/categoryList";

export default function CategoryList() {
  console.log(incomeCategories);
  const incomeList = incomeCategories.map((category) => (
    <option>{category.incomeName}</option>
  ));
  const expenseList = expenseCategories.map((category) => (
    <option>{category.expenseName}</option>
  ));
  return (
    <Select>
      {incomeList}
      <Divider orientation="horizontal" />
      <h2>Expenses</h2>
      {expenseList}
    </Select>
  );
}
