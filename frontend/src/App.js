import React from "react";
// import Sidebar from './components/Sidebar';
import Main from "./Main";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {GlobalProvider} from "./context/GlobalState";

const theme = createMuiTheme({
  palette: {
    // primary:{
    //   main:'#00838f'
    // },
    // secondary:{
    //   main:"#263238"
    // },
    //  type: 'dark',
  },
});

function App() {
  return (
    <GlobalProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
