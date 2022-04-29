import React from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "./context/userContext";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./common/theme";
import "./app/App.css";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Routes />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            theme="colored"
            hideProgressBar
          />
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
