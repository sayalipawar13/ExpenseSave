export const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return{
        ...state,
        expenses:[...state.expenses],
        loading:false,
        error:null,
        user:{
          loggedIn:true,
          username:action.payload

        }
      }
    case "GET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error:null
        
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        loading:false,
        error:null

      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
        loading:false,
        error:null
      };
    case "EXPENSE_ERROR":
      return {
        ...state,
        loading:false,
        error: action.payload,
      };

    default:
      return state;
  }
};


// export const AuthReducer = (state=null,action) =>{
//   switch(action.type){
//     case "GET_USER":
//       return action.payload || false
//     default:
//       return state
//   }
// }