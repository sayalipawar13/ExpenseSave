import React, { useState, useContext } from "react";
// import Sidebar from './components/Sidebar';
import Main from "./Main";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  const [DarkMode, setDarkMode] = useState(false);

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

  return (
    <GlobalProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <div className="App">
          <Main darkMode={darkModeFunc} />
        </div>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;