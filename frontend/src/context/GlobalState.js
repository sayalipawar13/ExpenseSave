import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  expenses: [],
  loading:true
};

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

  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        loading:state.loading,
        getExpenses,
        addExpenses,
        deleteExpenses,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
