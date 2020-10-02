import React, { useContext,useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../../context/GlobalState";
import "../../styles/expenseChart.scss";

export default function ExpenseChart(props) {
  const { expenses,getExpenses } = useContext(GlobalContext);

  const total = props.income - props.expense;

  const expenseDetail = expenses
    .filter((expense) => expense.type === "Expense")

    .map((expense) => {
      return { amt: expense.amount, category: expense.category };
    });
    var dict={};
    expenseDetail.forEach(
      function(item){
        var x=item.category;
        var y=item.amt;
        if(x in dict){
          dict[x] = dict[x]+y;
       }
       else{
        dict[x] = y;
       }
        
      }
    )
    console.log(dict);
  const expenseAmount = expenseDetail.map((item) => item.amt);
  // var expenseCategory = expenseDetail.map((item) => item.category);
  const expenseCategory =Object.keys(dict)

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

    for (let i = length; i >=0 ; i--) {
      colors.push(pallet[i % pallet.length]);
    }

    return colors;
  }
  const expenseData = {
    labels:expenseCategory ,
    datasets: [
      {
        data: Object.values(dict),
        backgroundColor: getColors(expenseCategory.length),
        hoverBackgroundColor: getColors(expenseCategory.length),
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
  useEffect(()=>{
    getExpenses();
  },[]);

  return (
    <div className="root">
      <Paper elevation={3} className="paper">
        <Typography variant="h5" className="textStyles">
          Stats
        </Typography>

        <Doughnut data={data} options={options} />
        {props.income === 0 && props.expense === 0 ? <Typography variant="h5" className="textStyles">No records</Typography> :
        <Typography variant="h5" className="textStyles">
          {props.income > props.expense ? (
            <span className="income">You saved ₹{total.toFixed(2)}.Well Done</span>
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
