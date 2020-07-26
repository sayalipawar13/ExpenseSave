import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { GlobalContext } from "../../context/GlobalState";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingLeft: "240px",
  },
  content: {
    padding: theme.spacing(3),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(6),
    right: theme.spacing(6),
  },
  textFieldStyle: {
    paddingBottom: theme.spacing(2),
  },
}));

function CreateExpense() {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);
  const { addExpenses } = useContext(GlobalContext);

  function handleClickOpen() {
    setExpense(() => {
      return { open: !expense.open };
    });
  }

  const [expense, setExpense] = useState({
    open: false,
    expenditure: {
      type: "Expense",
      amount: 0,
      category: "",
      desc: "",
    },
  });

  // const [list,listItem]=useState([]);

  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => {
      return {
        open: true,
        expenditure: { ...prev.expenditure, [name]: value },
      };
    });
  };

  const handleSubmits = (e) => {
    e.preventDefault();
    // listItem((pre)=>{
    //   return [...pre,expense]
    // });
    expense.expenditure.amount = expense.expenditure.amount * 1;
    addExpenses(expense.expenditure);

    //resetting the values
    setExpense({
      return: {
        open: false,
        expenditure: {
          type: "Expense",
          amount: 0,
          category: "",
          desc: "",
        },
      },
    });
  };
  const { open } = expense;
  const { type } = expense.expenditure || "Expense";
  const { amount } = expense.expenditure || 0;
  const { category } = expense.expenditure || "";
  const { desc } = expense.expenditure || "";
  // console.log(typeof(expense.amount));

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>

        <Dialog
          open={open ? open : false}
          onClose={handleClickOpen}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create Expense</DialogTitle>
          <DialogContent>
            <form>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.textFieldStyle}
              >
                <InputLabel htmlFor="type" color="secondary">
                  Enter Type
                </InputLabel>
                <Select
                  name="type"
                  onChange={handleSubmit}
                  value={type ? type : ""}
                  label="Enter Type"
                  color="secondary"
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>

              <TextField
                margin="dense"
                name="amount"
                type="number"
                onChange={handleSubmit}
                value={amount ? amount : ""}
                label="Enter Amount"
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.textFieldStyle}
              />

              <TextField
                margin="dense"
                name="category"
                type="string"
                onChange={handleSubmit}
                value={category ? category : ""}
                label="Enter category"
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.textFieldStyle}
              />

              <TextField
                margin="dense"
                name="desc"
                type="string"
                onChange={handleSubmit}
                value={desc ? desc : ""}
                label="Add note"
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.textFieldStyle}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              onClick={handleSubmits}
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateExpense;
