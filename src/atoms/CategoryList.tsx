import React, { useEffect } from "react";
import { Select } from "@chakra-ui/react";

import { expenseCategories, incomeCategories } from "../constants/categoryList";
import { categoryPropInterface } from "../types/propInterface";

export default function CategoryList(prop: categoryPropInterface) {
  const { setCat, isExpense } = prop;
  const incomeList = incomeCategories.map((category) => (
    <option key={category.incomeName}>{category.incomeName}</option>
  ));
  const expenseList = expenseCategories.map((category) => (
    <option key={category.expenseName}>{category.expenseName}</option>
  ));
  // Setting the category state
  const settingCategory = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    setCat!(e.target.value);
  };

  useEffect({});
  return (
    <Select onChange={settingCategory}>
      {isExpense ? expenseList : incomeList}
    </Select>
  );
}
