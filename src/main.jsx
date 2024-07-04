import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/redux/index.jsx";
import ClockProvider from "./store/context/clock.jsx";
import "./index.css";
import App from "./App.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClockProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ClockProvider>
);
