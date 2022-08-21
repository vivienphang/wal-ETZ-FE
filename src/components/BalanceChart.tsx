/* eslint-disable no-console */
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// eslint-disable-next-line import/extensions
import { balanceData } from "../data.js";

Chart.register(...registerables);

export default function BalanceChart() {
  const yearList = balanceData.map((year, index) => balanceData[index].year);
  console.log(yearList);
  return (
    <div>
      <Bar
        data={{
          labels: balanceData.map((year, index) => balanceData[index].year),
          datasets: [
            {
              label: "Balance",
              data: balanceData.map(
                // eslint-disable-next-line comma-dangle
                (balance, index) => balanceData[index].balance
              ),
              backgroundColor: ["#AA1155"],
              borderWidth: 6,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          responsive: true,
        }}
      />
    </div>
  );
}
