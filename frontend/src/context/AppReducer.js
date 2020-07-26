export default (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };
    default:
      return state;
  }
};
