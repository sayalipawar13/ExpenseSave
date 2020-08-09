import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import MaterialTable from "material-table";
import { GlobalContext } from "../../context/GlobalState";

function ViewExpenses() {
  const { expenses,deleteExpenses } = useContext(GlobalContext);
  console.log(expenses);

  const columns = [
    { title: "Type", field: "type" },
    { title: "Amount", field: "amount" },
    { title: "Category", field: "category" },
    { title: "Date", field: "date" },
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
              onClick: () => {
                  deleteExpenses(expenses[0]);
              }
          }
      ]}
      />
    </div>
  );
}

export default ViewExpenses;
