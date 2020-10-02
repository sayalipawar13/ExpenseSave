import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import CreateExpense from "./components/Layout/CreateExpense";
import ViewExpenses from "./components/Layout/ViewExpenses";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./components/Layout/Dashboard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Main(props) {
  const classes = useStyles();

  const darkModeFunction=(darkMode)=>{
    props.darkMode(darkMode);
  }
  
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Sidebar darkMode={darkModeFunction} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route exact path="/viewExpense">
              <ViewExpenses />
            </Route>

            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Main;
