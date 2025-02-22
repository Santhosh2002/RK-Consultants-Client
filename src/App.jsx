import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import "./auth/axiosInstance";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
