import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  expenses: [
    { type: "Expense", amount: 1500, category: "Salary", desc: "" },
    { type: "Income", amount: 150, category: "Salary", desc: "" },
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

  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        addExpenses,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
