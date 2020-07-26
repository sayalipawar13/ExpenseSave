import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import { GlobalContext } from "../../context/GlobalState";

export default function ExpenseChart() {
  //   displayName: 'DoughnutExample';
  const { expenses } = useContext(GlobalContext);
  const income = expenses
    .filter((expense) => expense.type === "Income")
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

  const expense = expenses
    .filter((expense) => expense.type === "Expense")
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["green", "red"],
        hoverBackgroundColor: ["green", "red"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: "flex" }}>
      <Paper
        elevation={3}
        style={{ height: "50vh", width: "80vh", marginRight: "20px" }}
      >
        <Doughnut data={data} options={options} />
      </Paper>
    </div>
  );
}
