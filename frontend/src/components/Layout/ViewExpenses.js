import React, { useContext,useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import moment from "moment";
import { GlobalContext } from "../../context/GlobalState";

function ViewExpenses() {
  let { expenses,deleteExpenses,getExpenses} = useContext(GlobalContext);
  expenses = expenses.map(expense => {
    expense = {...expense}
    expense.date = moment(expense.date).format('DD-MM-YYYY');
    return expense;
});
// console.log(expenses);

  useEffect(()=>{
    getExpenses();
  },[]);

  const columns = [
    { title: "Type", field: "type" },
    { title: "Amount", field: "amount" },
    { title: "Category", field: "category" },
    { title: "Date", field: "date" },
    { title: "Description", field: "desc" },

  ];

  return (
    <div>
      <Typography variant="h5" style={{ paddingBottom: "40px" }}>
        View Expense
      </Typography>
      <MaterialTable
        data={expenses}
        columns={columns}
        options={{
          exportButton: true,
          showTitle: false,
        }}
        actions={[
          {
              icon: 'delete',
              tooltip: 'Delete Entry',
              onClick: (event,data) => {
                  deleteExpenses(data._id);
              }
          }
      ]
    }
      />
    </div>
  );
}

export default ViewExpenses;
