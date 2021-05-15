import React, { useState, useContext, useEffect } from "react";
// import Sidebar from './components/Sidebar';
import Main from "./Main";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";
import Login from "./components/Layout/Login";
import Loading from "./components/Layout/Loading";

const MainLoading=(props)=>{
  console.log(props);
  if(!props.loggedIn) return <Login />
  else if(props.loading) return <Loading />
  
    return (
  <Main darkMode={props.darkModeFunc} />
    )
  }
  


function App() {
  const [DarkMode, setDarkMode] = useState(false);
  const { user, getUser,loading } = useContext(GlobalContext);
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

  useEffect(() => {
    getUser();
  }, []);
  


  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <div className="App">
        <Main darkModeFunc={darkModeFunc}/> 

        {/* <MainLoading loggedIn={user.loggedIn} loading={loading} darkModeFunc={darkModeFunc}/> */}
        {/* {(()=>{
          if(user.loggedIn===false) return <Login />
          else{
            if(loading) return <Loading />
            else return <Main darkMode={darkModeFunc} />
          }

        })()} */}
        {/* {user.loggedIn ? <Main darkMode={darkModeFunc} /> : <Login />} */}
      </div>
    </ThemeProvider>
  );
}

export default App;
