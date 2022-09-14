import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { expenses } from "../data";
import { EIPieChartPropInterface } from "../types/propInterface";

Chart.register(...registerables);
// Getting the data for the line chart

export default function LineChart(props: EIPieChartPropInterface) {
  const { recs } = props;
  return (
    <div>
      <Line
        data={{
          labels: ["expense"],
          datasets: [
            {
              label: "Expense",
              data: [expenses],
            },
          ],
        }}
      />
    </div>
  );
}
