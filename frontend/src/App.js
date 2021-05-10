import React, { useState, useContext,useEffect } from "react";
// import Sidebar from './components/Sidebar';
import Main from "./Main";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { GlobalProvider,GlobalContext } from "./context/GlobalState";
import Login from './components/Layout/Login';

function App() {
  const [DarkMode, setDarkMode] = useState(false);
const {user,getUser,getExpenses,expenses,state}=useContext(GlobalContext);
  var typeP;
  function darkModeFunc(darkMode) {
    setDarkMode(darkMode);
  }

  typeP = DarkMode ? "dark" : "light";

  const Theme = createMuiTheme({
    palette: {
      // primary:{
      //   main:'#00838f'
      // },
      // secondary:{
      //   main:"#263238"
      // },
      type: typeP,
    },
  });
  useEffect(()=>{
    getUser();
    getExpenses();
  },[]);
  console.log(expenses,user);
  return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <div className="App">
          {user.loggedIn ? <Main darkMode={darkModeFunc} />:<Login />}
          
        </div>
      </ThemeProvider>
  );
}

export default App;