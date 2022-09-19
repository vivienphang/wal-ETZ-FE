import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Box, Heading } from "@chakra-ui/react";
// eslint-disable-next-line import/no-unresolved, import/extensions
// Import records data
import { EIPieChartPropInterface } from "../types/propInterface";
import colorList from "../constants/colorList";

Chart.register(...registerables);
// Getting accountState

function ExpensePie(props: EIPieChartPropInterface) {
  const { recs } = props;
  const [expenseRecs, setExpenseRecs] = useState<any[]>([]);
  const [expenseCat, setExpenseCat] = useState<any[]>([]);
  const [labelNames, setLabelNames] = useState<any[]>([]);
  // An array of only expenses
  const categorySplit: any = {};

  useEffect(() => {
    // Set the expenseRecs from recs
    const arr: any[] = [];
    recs!.map((rec) => {
      if (rec.isExpense) {
        arr.push(rec);
      }
      return null;
    });
    setExpenseRecs(arr);
  }, [recs]);

  useEffect(() => {
    // Based only on expenses
    // On expenseRecs change, change the data for the graph
    expenseRecs.forEach((rec) => {
      const category = rec.recordCategory;
      if (category! in categorySplit) {
        // If key exists then add data into key
        categorySplit[`${category}`].push(rec);
      } else {
        // If key doesnt exist create it
        categorySplit[`${category}`] = [rec];
      }
    });
  }, [expenseRecs]);

  useEffect(() => {
    // Change the labelNames and datasets.data
    const labelData = Object.keys(categorySplit);
    setLabelNames(labelData);
    // A summary of the three category amounts
    // Logic to render the graphs based on expenseRecs
    // Take categorySplit and map for each category
    const valueArr = Object.values(categorySplit);
    // Adding all the expenses based on category
    const data = valueArr.map((cat: any) => {
      let catAmount = 0;
      cat.map((rec: { amount: number }) => {
        catAmount += Number(rec.amount);
        return null;
      });
      return catAmount;
    });
    setExpenseCat(data);
  }, [expenseRecs]);

  return (
    <Box my={3}>
      <Heading fontSize="lg" color={colorList.textColor}>
        Expense
      </Heading>
      {expenseCat.length === 0 ? (
        <Heading my={5} fontSize="lg">
          No data to display
        </Heading>
      ) : (
        <Pie
          data={{
            labels: labelNames,
            datasets: [
              {
                label: "Expense",
                data: expenseCat,
                backgroundColor: colorList.pieChartColorArr,
              },
            ],
          }}
        />
      )}
    </Box>
  );
}

export default ExpensePie;
