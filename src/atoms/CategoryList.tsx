import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

import { expenseCategories, incomeCategories } from "../constants/categoryList";
import { categoryPropInterface } from "../types/propInterface";

export default function CategoryList(prop: categoryPropInterface) {
  const { setCat, isExpense } = prop;
  const [selectedValue, setSelectedValue] = useState<string | number>(-1);
  const incomeList = incomeCategories.map((category) => (
    <option key={category.name}>{category.name}</option>
  ));
  const expenseList = expenseCategories.map((category) => (
    <option key={category.name}>{category.name}</option>
  ));

  const settingCategory: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
    setCat(e.target.value);
  };

  useEffect(() => {
    setSelectedValue(-1);
    setCat("");
  }, [isExpense]);

  return (
    <Select
      onChange={settingCategory}
      value={selectedValue}
      placeholder="Select Category"
    >
      {isExpense ? expenseList : incomeList}
    </Select>
  );
}
