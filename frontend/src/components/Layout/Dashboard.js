import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import CreateExpense from "./CreateExpense";
import { GlobalContext } from "../../context/GlobalState";
import ExpenseChart from "./ExpenseChart";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
      <Typography variant="h4">Dashboard </Typography>
      <CreateExpense />
      <Typography variant="h5">
        <ArrowUpwardIcon style={{ fontSize: 20, color: "green" }} />
        ₹{income}
        <ArrowDownwardIcon
          style={{ fontSize: 20, color: "red", marginLeft: "50px" }}
        />
        ₹{expense}
      </Typography>
      <span style={{ fontSize: 20 }}>Income</span>
      <span style={{ fontSize: 20, marginLeft: "60px" }}>Expense</span>

      <ExpenseChart income={income} expense={expense} />
    </div>
  );
}

export default Dashboard;
