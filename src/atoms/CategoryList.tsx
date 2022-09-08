import React from "react";
import { Select, Divider } from "@chakra-ui/react";

import { expenseCategories, incomeCategories } from "../constants/categoryList";
import { categoryPropInterface } from "../types/propInterface";

export default function CategoryList(prop: categoryPropInterface) {
  const { setCat } = prop;
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
  return (
    <Select onChange={settingCategory}>
      {incomeList}
      <Divider orientation="horizontal" />
      {expenseList}
    </Select>
  );
}
