import ReactDOM from "react-dom/client";

import ClockProvider from "./store/context/clock.jsx";
import ModeProvider from "./store/context/mode.jsx";
import "./index.css";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModeProvider>
    <ClockProvider>
        <App />
    </ClockProvider>
  </ModeProvider>
);
