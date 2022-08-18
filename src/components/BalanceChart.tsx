import React from "react";
import { Bar } from "react-chartjs-2";

export default function BalanceChart() {
  return (
    <div>
      <Bar
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
            },
          ],
        }}
      />
    </div>
  );
}
