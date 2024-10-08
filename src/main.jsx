import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import ClockProvider from "./store/context/clock.jsx";
import ModeProvider from "./store/context/mode.jsx";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/redux/location.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ModeProvider>
      <ClockProvider>
        <App />
      </ClockProvider>
    </ModeProvider>
  </Provider>
);
