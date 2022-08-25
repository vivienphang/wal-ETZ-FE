import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { randomColor } from "randomcolor";
import { Box } from "@chakra-ui/react";
// eslint-disable-next-line import/no-unresolved, import/extensions
import { expenses } from "../data.js";

Chart.register(...registerables);

function ExpensePie() {
  const colorList = () => {
    const colorArr = [];
    for (let i = 0; i < expenses.length; i += 1) {
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
              label: "Income",
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
