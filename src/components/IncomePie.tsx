/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import randomColor from "randomcolor";
// eslint-disable-next-line import/first, import/extensions
import { income } from "../data.js";
import { EIPieChartPropInterface } from "../types/propInterface";

Chart.register(...registerables);
// Import data from records in homepage array

export default function IncomePie(props: EIPieChartPropInterface) {
  const { recs } = props;
  console.log(recs);
  const colorList = () => {
    const colorArr: any[] = [];
    for (let i = 0; i < income.length; i += 1) {
      const randomCol = randomColor();
      colorArr.push(randomCol);
    }
    return colorArr;
  };
  return (
    <div>
      <h1>Income Pie</h1>
      <Pie
        data={{
          labels: income.map((incomeName) => incomeName.incomeName),
          datasets: [
            {
              label: "Income",
              data: income.map((amount) => amount.amount),
              backgroundColor: colorList(),
            },
          ],
        }}
      />
    </div>
  );
}
