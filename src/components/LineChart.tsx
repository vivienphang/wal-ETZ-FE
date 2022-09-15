import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { expenses } from "../data";
import { EIPieChartPropInterface } from "../types/propInterface";

Chart.register(...registerables);
Chart.defaults.scale.grid.display = false;
// Getting the data for the line chart

export default function LineChart(props: EIPieChartPropInterface) {
  const { recs } = props;
  // Balance as of now or as of current date
  // Each record change will add in the line chart
  useEffect(() => {
    console.log(recs);
  }, [recs]);
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
