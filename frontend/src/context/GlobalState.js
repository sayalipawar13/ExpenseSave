import React, { createContext, useReducer } from "react";
import {ExpenseReducer,AuthReducer} from "./AppReducer";
import axios from "axios";
import combineReducers from "react-combine-reducers";

const initialStateExpense = {
  expenses: [],
  loading:true,
  error:null
};

const initialStateUser = null

const [AppReducer,initialState]=combineReducers({
  expenses:[ExpenseReducer,initialStateExpense],  
  user:[AuthReducer,initialStateUser]
})

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  async function getExpenses(){
    try {
      const res = await axios.get("/api/expenses/expenseList");
      dispatch({
        type:"GET_EXPENSES",
        payload:res.data.data
      })
      // console.log(res.data.data);
    } catch (err) {
      dispatch({
        type:"EXPENSE_ERROR",
        payload:err.response.data.error
      })
    }
  }

  async function addExpenses(expense) {
    const config={
      headers:{
        'Content-Type': 'application/json'
      }
    }
    try {     
      const res = await axios.post("/api/expenses/createExpense",expense,config);

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

  async function fetchUser(){
try {
  const res=await axios.get('/auth/user');
  //console.log(res);
  dispatch({
    type:"GET_USER",
    payload:res.data
  })
} catch (error) {
  console.log(error);
}
  }
  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses.expenses,
        loading:state.expenses.loading,
        error:state.expenses.error,
        user:state.user,
        getExpenses,
        addExpenses,
        deleteExpenses,
        fetchUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
