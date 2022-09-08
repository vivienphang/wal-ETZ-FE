import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import randomColor from "randomcolor";
import { Box } from "@chakra-ui/react";
// eslint-disable-next-line import/no-unresolved, import/extensions
// Import records data
import { expenses } from "../data.js";
import { EIPieChartPropInterface } from "../types/propInterface";

Chart.register(...registerables);
// Getting accountState

function ExpensePie(props: EIPieChartPropInterface) {
  const { recs } = props;
  console.log(recs);
  const colorList = () => {
    const colorArr: any[] = [];
    for (let i = 0; i < recs!.length; i += 1) {
      const randomCol = randomColor();
      colorArr.push(randomCol);
    }
    return colorArr;
  };
  return (
    <Box>
      <h1>Expense Pie</h1>
      <Pie
        data={{
          labels: expenses.map((expenseName) => expenseName.name),
          datasets: [
            {
              label: "Expense",
              data: expenses.map((amount) => amount.amount),
              backgroundColor: colorList(),
            },
          ],
        }}
      />
    </Box>
  );
}

export default ExpensePie;
