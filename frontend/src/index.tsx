import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'devextreme/dist/css/dx.light.css';
import "./styles/iwVariables.scss";
import "./styles/dxTable.scss";
import "./styles/formElemets.scss";
import "./styles/mixins.scss";
import "./styles/index.scss";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter', 'sans-serif'
    ].join(',')
  }
});

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(
    <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
    </AuthProvider>
);