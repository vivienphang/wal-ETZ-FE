import React, { useEffect, useState } from "react";
import { filterPropInterface } from "../types/propInterface";

export default function Filter(props: filterPropInterface) {
  const { filters, setFilters } = props;

  return (
    <div>
      <h1>Filter component</h1>
    </div>
  );
}
