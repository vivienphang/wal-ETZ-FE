import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { EIPieChartPropInterface } from "../types/propInterface";

Chart.register(...registerables);
Chart.defaults.scale.grid.display = false;
// Getting the data for the line chart

export default function LineChart(props: EIPieChartPropInterface) {
  const { recs } = props;
  const [balanceArr, setBalanceArr] = useState<number[]>([]);
  const [lineData, setLineData] = useState<number[]>([]);
  const [labelName, setLabelName] = useState<string[]>([]);
  // Balance as of now or as of current date
  // Each record change will add in the line chart
  // Based on records itself
  // On change of everyrec, create new point on the chart

  useEffect(() => {
    setBalanceArr([]);
    setLineData([]);
    setLabelName([]);
    recs!.reverse().forEach((rec: any) => {
      const { amount } = rec!;
      let income = 0;
      let expense = 0;
      if (rec.isExpense === true) {
        // Take expense here;
        expense += amount;
      } else {
        income += amount;
      }
      const balance = income - expense;
      setBalanceArr((current) => [...current, balance]);
    });
  }, [recs]);

  useEffect(() => {
    // console.log(balanceArr);
    // Logic to use array and create the data for the linechart
    balanceArr.forEach((rec, index) => {
      let dataPoint = 0;
      // For each record add a point in the line chart
      // Creating an array to store all the data point
      if (index === 0) {
        dataPoint = rec;
        // console.log(dataPoint);
        setLineData((current) => [...current, dataPoint]);
      } else {
        // Loop through all previous records
        dataPoint = 0;
        let previousTotal = 0;
        for (let i = 0; i < index; i += 1) {
          // console.log(`i=${i}, index=${index}`);
          previousTotal += balanceArr[i];
          // console.log(`PreviousTotal=${previousTotal}, rec=${rec}`);
        }
        dataPoint = previousTotal + rec;
        // console.log(`datapoint=${dataPoint}`);
        // console.log(dataPoint);
        setLineData((current) => [...current, dataPoint]);
      }
    });
  }, [balanceArr]);

  useEffect(() => {
    const data = lineData.map((index) => {
      return `${index}`;
    });
    setLabelName(data);
    console.log(lineData);
  }, [lineData]);
  useEffect(() => {
    console.log(labelName);
  }, [labelName]);

  return (
    <div>
      <Line
        data={{
          labels: labelName,
          datasets: [
            {
              label: "Balance Data",
              data: lineData,
              backgroundColor: "#50a36c",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              // Makes the point radius 0 so it is one smooth line
              radius: 0,
            },
            line: {
              // creates curves on the line
              tension: 0.5,
              // Changes the color of the line
              borderColor: "#50a36c",
            },
          },
          scales: {
            xAxes: {
              ticks: {
                display: false,
              },
            },
            yAxes: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
