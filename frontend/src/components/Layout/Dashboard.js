import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import CreateExpense from "./CreateExpense";
import { GlobalContext } from "../../context/GlobalState";
import ExpenseChart from "./ExpenseChart";

function Dashboard() {
  const { expenses } = useContext(GlobalContext);

  const amt = expenses.map((expense) => expense.amount);
  const total = amt.reduce((acc, item) => (acc += item), 0);

  const income = expenses
    .filter((expense) => expense.type == "Income")
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

  const expense = expenses
    .filter((expense) => expense.type == "Expense")
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

  return (
    <div>
      <Typography variant="h5">Dashboard </Typography>
      <CreateExpense />
      <h2>
        {total} {income} {expense}
      </h2>
      <ExpenseChart />
    </div>
  );
}

export default Dashboard;
