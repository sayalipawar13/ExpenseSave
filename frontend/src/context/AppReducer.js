export default (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };
      case "DELETE_TRANSACTION":
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense!==action.payload),
      };
    default:
      return state;
  }
};
