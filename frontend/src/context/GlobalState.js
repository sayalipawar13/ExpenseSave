import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  expenses: [
    { type: "Expense", amount: 1500, date: null, category: "Salary", desc: "" },
    { type: "Income", amount: 150, date: null, category: "Salary", desc: "" },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  //Actions
  function addExpenses(expense) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: expense,
    });
  }

  function deleteExpenses(expense) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: expense,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        addExpenses,
        deleteExpenses
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
