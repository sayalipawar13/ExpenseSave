import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import PublishIcon from "@material-ui/icons/Publish";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../context/GlobalState";
import axios from "axios";
import FormData from "form-data";
import moment from "moment";

var num;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    padding: theme.spacing(3),
  },
  fab: {
    position: "fixed",
    right: theme.spacing(18),
    bottom: theme.spacing(6),
  },
  textFieldStyle: {
    paddingBottom: theme.spacing(2),
  },
}));

function Upload() {
  const classes = useStyles();

  const initialState = {
    open: false,
    file: null,
    error:"",
    expenditure: {
      type: "Expense",
      amount: 0,
      date: moment(),
      category: "Receipt",
      desc: "",
    },
  };
  // const [open, setOpen] = useState(false);
  const { addExpenses } = useContext(GlobalContext);

  const [expense, setExpense] = useState(initialState);

  function handleClickOpen() {
    setExpense(() => {
      return {
        open: !expense.open,
        file: null,
        error:"",
        expenditure: {
          type: "Expense",
          amount: num,
          date: moment(),
          category: "",
          desc: "",
        },
        
      };
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    var data = new FormData();
    data.append("language", "eng");
    data.append("file", expense.file);
    data.append("isTable", "True");

    var config = {
      method: "post",
      url: "https://api.ocr.space/parse/image",
      headers: {
        apikey: "ca258a9ea788957",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        var patt = /(Total+(\d+)+(\.\d+)|Total+(\d+)|Total+\$+(\d+)+(\.\d+)|Amt+\$+(\d+)+(\.\d+)|Amt+(\d+)+(\.\d+)|Total+\$+(\d+)+(\,\d+))/gim;
        // console.log(this.state.result);
        var resData = response.data.ParsedResults[0].ParsedText.replace(/\s/gim, "");
        var result = resData.match(patt).slice(-1).toString();
        var split_string = result.split(/(\d+)/);
        var extractNo = split_string.slice(1, split_string.length);
        num = extractNo.join("");
        expense.expenditure.amount = Number(num);
        setExpense({
          open: !expense.open,
          file: expense.file,
          expenditure: {
            type: "Expense",
            amount: num,
            date: moment(),
            category: "Receipt",
            desc: "",
          },
        });

        const { open, expenditure } = expense;

        addExpenses(expenditure);

        //   resetting the values
        setExpense(initialState);
      })

      .catch(function (error) {
          setExpense({open:false,error:"Something went wrong or could not extract the data"})
        console.log(error);
      });
  };
  const {
    open,
    expenditure: { type, amount, date, category, desc },
  } = expense;
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Tooltip title="Upload File">
          <Fab
            color="secondary"
            size="large"
            className={classes.fab}
            onClick={handleClickOpen}
          >
            <PublishIcon />
          </Fab>
        </Tooltip>

        <Dialog
          open={open ? open : false}
          onClose={handleClickOpen}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Upload File</DialogTitle>
          <DialogContent>
            <form>
              <input
                type="file"
                onChange={(e) => {
                  setExpense({
                    open: true,
                    file: e.target.files[0],
                    expenditure: {
                      type: "Expense",
                      amount:amount ? amount : 0,
                      date: moment(),
                      category: "Receipt",
                      desc: "",
                    },
                  });
                }}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Upload;
