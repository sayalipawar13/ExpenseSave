import React,{useEffect,useContext} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import CreateExpense from "./components/Layout/CreateExpense";
import ViewExpenses from "./components/Layout/ViewExpenses";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./components/Layout/Dashboard";
import {GlobalContext} from "./context/GlobalState";
import Login from "./components/Layout/Login";

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
const {user,expenses,getUser}=useContext(GlobalContext);
  const darkModeFunction=(darkMode)=>{
    props.darkMode(darkMode);
  }
// console.log(user.data);
  // useEffect(()=>{
  //   getUser();
  // },[]);

  // const Check=()=>{
  //   switch(user){
  //     case null:
  //       return <div>loading...</div>
  //     case false:

  //   }
  // }
  console.log(expenses);

  return (
    <div className={classes.root}>
      <BrowserRouter>
    {user.loggedIn ? <Sidebar darkMode={darkModeFunction} /> :null} 

    {/* <Sidebar darkMode={darkModeFunction} /> */}
      
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {user.loggedIn ? 
          <Switch>
      
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route exact path="/viewExpense">
            <ViewExpenses />
          </Route>

          <Redirect to="/" />
         
        </Switch> :null
}
          
          </div>
      </BrowserRouter>
    </div>
  );
}

export default Main;
