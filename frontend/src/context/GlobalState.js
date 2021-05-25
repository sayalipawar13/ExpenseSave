import React, { createContext, useReducer } from "react";
import {ExpenseReducer} from "./AppReducer";
import axios from "axios";
import combineReducers from "react-combine-reducers";

const initialStateExpense = {
  expenses: [],
  loading:false,
  error:null,
  user:{
    loggedIn:false,
    username:''
  }
};

const initialStateUser = null

// const [AppReducer,initialState]=combineReducers({
//   expenses:[ExpenseReducer,initialStateExpense],  
// })

export const GlobalContext = createContext(initialStateExpense);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, initialStateExpense);

  //Actions
  async function getExpenses(){
    console.log("gettttttttttttttttt");
    try {
      const res = await axios.get("/api/expenses/expenseList");
      dispatch({
        type:"GET_EXPENSES",
        payload:res.data.data
      })
    } catch (err) {
      dispatch({
        type:"EXPENSE_ERROR",
        payload:err.response.data.error
      })
    }
  }

  async function addExpenses(expense,username) {
    const config={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    try {     
      const res = await axios.post("/api/expenses/createExpense",{expense,username},config);

    dispatch({
      type: "ADD_EXPENSE",
      payload: res.data.data,
    });
    } catch (err) {
      dispatch({
        type:"EXPENSE_ERROR",
        payload:err.response.data.error
      })
      console.log(err);

    }
    
  }

  async function deleteExpenses(id) {
    try {
      await axios.delete(`/api/expenses/delete/${id}`);
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
    } catch (err) {
      dispatch({
        type:"EXPENSE_ERROR",
        payload:err.response.data.error
      })
    }
    
  }

  async function getUser(){
try {
  const res=await axios.get('/auth/user');
  // console.log(res.data.username);
  if(res.data){
    dispatch({
      type:"GET_USER",
      payload:res.data.username
    })
  }
  
} catch (error) {
  console.log(error);
}
  }

  async function logout(){
    try {
      const res=await axios.post('auth/logout');
      dispatch({
        type:"LOGOUT_USER"
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        loading:state.loading,
        error:state.error,
        user:state.user,
        logout,
        getExpenses,
        addExpenses,
        deleteExpenses,
        getUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
