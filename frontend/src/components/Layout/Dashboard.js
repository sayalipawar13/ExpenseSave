import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
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
      <Grid container>
        <Grid item xs={3}>
          <Typography variant="h5">
            <ArrowUpwardIcon style={{ fontSize: 20, color: "green" }} />₹
            {income}
          </Typography>
          <span style={{ fontSize: 20 }}>Income</span>
        </Grid>
        
        <Grid item xs={3}>
          <Typography variant="h5">
            <ArrowDownwardIcon style={{ fontSize: 20, color: "red" }} />₹
            {expense}
          </Typography>
          <span style={{ fontSize: 20 }}>Expense</span>
        </Grid>
      </Grid>
      <ExpenseChart income={income} expense={expense} />
    </div>
  );
}

export default Dashboard;
