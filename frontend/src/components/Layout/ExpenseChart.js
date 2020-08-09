import React, { useContext } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../../context/GlobalState";
import "../../styles/expenseChart.scss";

export default function ExpenseChart(props) {
  //   displayName: 'DoughnutExample';
  const { expenses } = useContext(GlobalContext);
  // const income = expenses
  //   .filter((expense) => expense.type === "Income")
  //   .map((expense) => expense.amount)
  //   .reduce((acc, item) => (acc += item), 0);

  // const expense = expenses
  //   .filter((expense) => expense.type === "Expense")
  //   .map((expense) => expense.amount)
  //   .reduce((acc, item) => (acc += item), 0);

  console.log(props);
  const total = props.income - props.expense;

  const expenseDetail = expenses
    .filter((expense) => expense.type === "Expense")

    .map((expense) => {
      return { amt: expense.amount, category: expense.category };
    });

  const expenseAmount = expenseDetail.map((item) => item.amt);
  const expenseCategory = expenseDetail.map((item) => item.category);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [props.income, props.expense],
        backgroundColor: ["green", "red"],
        hoverBackgroundColor: ["green", "red"],
        borderWidth: 0,
      },
    ],
  };
  function getColors(length) {
    let pallet = [
      "#0074D9",
      "#FF4136",
      "#2ECC40",
      "#FF851B",
      "#7FDBFF",
      "#B10DC9",
      "#FFDC00",
      "#001f3f",
      "#39CCCC",
      "#01FF70",
      "#85144b",
      "#F012BE",
      "#3D9970",
      "#111111",
      "#AAAAAA",
    ];
    let colors = [];

    for (let i = 0; i < length; i++) {
      colors.push(pallet[i % pallet.length]);
    }

    return colors;
  }
  const expenseData = {
    labels: expenseCategory,
    datasets: [
      {
        data: expenseAmount,
        backgroundColor: getColors(expenseAmount.length),
        hoverBackgroundColor: getColors(expenseAmount.length),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    legend: {
      labels: {
        fontSize: 15,
      },
      // display:false
    },
  };

  return (
    <div className="root">
      <Paper elevation={3} className="paper">
        <Typography variant="h5" className="textStyles">
          Stats
        </Typography>

        <Doughnut data={data} options={options} />
        {props.income == 0 ? <Typography variant="h5" className="textStyles">No records</Typography> :
        <Typography variant="h5" className="textStyles">
          {props.income > props.expense ? (
            <span className="income">You saved ₹{total}.Well Done</span>
          ) : (
            <span className="expense">Your expenses are more</span>
          )}
        </Typography>}
      </Paper>

      <Paper elevation={3} className="paper">
        <Typography variant="h5" className="textStyles">
          Expenses Breakdown{" "}
        </Typography>
        <Pie data={expenseData} options={options} />
      </Paper>
    </div>
  );
}
