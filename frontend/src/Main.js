import React, { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import CreateExpense from "./components/Layout/CreateExpense";
import ViewExpenses from "./components/Layout/ViewExpenses";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "./components/Layout/Dashboard";
import { GlobalContext } from "./context/GlobalState";
import Login from "./components/Layout/Login";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.up('sm')]: {
      marginLeft:"240px",
    },
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

function PrivateRoute({ children,darkModeFunction ,...rest }) {
  const { user } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.loggedIn ? (
          <>
            <Sidebar darkMode={darkModeFunction} />

            {children}
          </>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ children, ...rest }) {
  const { user } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Main(props) {
  const classes = useStyles();
  const { user, expenses, getUser } = useContext(GlobalContext);
  const darkModeFunction = (darkMode) => {
    props.darkModeFunc(darkMode);
  };
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
      {/* {user.loggedIn ?  */}
      <BrowserRouter>
        {/* {user.loggedIn ? <Sidebar darkMode={darkModeFunction} /> :null}  */}
        
        <div className={classes.content}>
          <div className={classes.toolbar} />
          {/* {user.loggedIn ?  */}
          <Switch>
            <PublicRoute exact path="/">
              <Login />
            </PublicRoute>

            <PrivateRoute path="/dashboard" exact 
            darkModeFunction={darkModeFunction}
            >
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute exact path="/viewExpense" 
            darkModeFunction={darkModeFunction}
            >
              <ViewExpenses />
            </PrivateRoute>
            <Redirect path="/" />
          </Switch>
        </div>
      </BrowserRouter>
      {/* :null } */}
    </div>
  );
}

export default Main;
