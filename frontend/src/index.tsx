import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./state/store";
import { Provider } from "react-redux";
import "./index.scss";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);