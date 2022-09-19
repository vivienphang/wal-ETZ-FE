/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
// eslint-disable-next-line import/extensions
// Take data from homePage records array
import { EIPieChartPropInterface } from "../types/propInterface";
import colorList from "../constants/colorList";

Chart.register(...registerables);
// Removing grid lines for bar chart
Chart.defaults.scale.grid.display = false;

export default function BalanceChart(props: EIPieChartPropInterface) {
  const { recs } = props;
  // Import initial income/expense state here which is the
  // combination of all the records from all accounts
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  // Extract the granddaughter from recs for each amount
  useEffect(() => {
    let inc = 0;
    let exp = 0;
    if (!recs) {
      return;
    }
    recs!.forEach((rec) => {
      const { amount } = rec!;
      if (rec.isExpense) {
        exp += Number(amount);
      } else if (!rec.isExpense) {
        inc += Number(amount);
      }
    });
    setIncome(Number(inc.toFixed(2)));
    setExpense(Number(exp.toFixed(2)));
  }, [recs]);

  return (
    <div>
      <Bar
        data={{
          labels: [""],
          datasets: [
            {
              label: "Income",
              data: [income],
              backgroundColor: [colorList.moneyGreen],
              borderRadius: 10,
            },
            {
              label: "Expense",
              data: [expense],
              backgroundColor: [colorList.moneyRed],
              borderRadius: 10,
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
