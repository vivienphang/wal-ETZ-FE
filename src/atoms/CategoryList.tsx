import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

import { expenseCategories, incomeCategories } from "../constants/categoryList";
import { categoryPropInterface } from "../types/propInterface";

export default function CategoryList(prop: categoryPropInterface) {
  const { setCat, cat, isExpense, isAddRecord, isDisabled } = prop;
  const [selectedValue, setSelectedValue] = useState<string | number>(cat);
  const [initCat] = useState(cat);
  const incomeList = incomeCategories.map((category) => (
    <option key={category.name} value={category.name}>
      {category.name}
    </option>
  ));
  const expenseList = expenseCategories.map((category) => (
    <option key={category.name} value={category.name}>
      {category.name}
    </option>
  ));

  const settingCategory: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedValue(e.target.value);
    setCat(e.target.value);
  };

  useEffect(() => {
    if (isAddRecord) {
      setSelectedValue(-1);
      setCat("");
    } else {
      setSelectedValue(initCat);
      setCat(initCat);
    }
  }, [isExpense, isDisabled]);

  return (
    <Select
      onChange={settingCategory}
      value={selectedValue}
      placeholder="Selected Value"
      disabled={isDisabled}
    >
      {isExpense ? expenseList : incomeList}
    </Select>
  );
}
