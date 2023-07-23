import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import 'devextreme/dist/css/dx.light.css';
import { AuthProvider } from "./context/AuthProvider";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);