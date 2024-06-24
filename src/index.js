import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/redux";

import ClockProvider from "./store/context/clock";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClockProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ClockProvider>
);
