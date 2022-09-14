/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import randomColor from "randomcolor";
// eslint-disable-next-line import/first, import/extensions
import { EIPieChartPropInterface } from "../types/propInterface";

Chart.register(...registerables);
// Import data from records in homepage array

export default function IncomePie(props: EIPieChartPropInterface) {
  const { recs } = props;
  const [incomeRecs, setIncomeRecs] = useState<any[]>([]);
  const [incomeCat, setIncomeCat] = useState<any[]>([]);
  const [labelNames, setLabelNames] = useState<any[]>([]);
  // An array of only expenses
  const categorySplit: any = {};

  const colorList = () => {
    const colorArr: any[] = [];
    for (let i = 0; i < recs!.length; i += 1) {
      const randomCol = randomColor();
      colorArr.push(randomCol);
    }
    return colorArr;
  };

  useEffect(() => {
    // Set the expenseRecs from recs
    const arr: any[] = [];
    recs!.map((rec) => {
      if (!rec.isExpense) {
        arr.push(rec);
      }
      return null;
    });
    setIncomeRecs(arr);
  }, [recs]);

  useEffect(() => {
    // Based only on expenses
    // On expenseRecs change, change the data for the graph
    incomeRecs.forEach((rec) => {
      const category = rec.recordCategory;
      if (category! in categorySplit) {
        // If key exists then add data into key
        categorySplit[`${category}`].push(rec);
      } else {
        // If key doesnt exist create it
        categorySplit[`${category}`] = [rec];
      }
    });
  }, [incomeRecs]);

  useEffect(() => {
    // Change the labelNames and datasets.data
    const labelData = Object.keys(categorySplit);
    setLabelNames(labelData);
    // Logic to render the graphs based on expenseRecs
    // Take categorySplit and map for each category
    const valueArr = Object.values(categorySplit);
    // Adding all the expenses based on category
    const data = valueArr.map((cat) => {
      let catAmount = 0;
      cat.map((rec: { amount: number }) => {
        catAmount += rec.amount;
        return null;
      });
      return catAmount;
    });
    setIncomeCat(data);
  }, [incomeRecs]);
  return (
    <div>
      <h1>Income Pie</h1>
      <Pie
        data={{
          labels: labelNames,
          datasets: [
            {
              label: "Income",
              data: incomeCat,
              backgroundColor: colorList(),
            },
          ],
        }}
      />
    </div>
  );
}
