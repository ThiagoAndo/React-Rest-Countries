import { createContext, useState } from "react";

export const ModeAction = createContext({
  mode: null,
  changeMode: () => {},
});

export default function ModeProvider({ children }) {
  const [mode, setMode] = useState(false);
  function changeMode() {
    setMode((prev) => {
      return (prev = !prev);
    });
  }

  const ctxValue = {
    mode,
    changeMode,
  };

  return <ModeAction.Provider value={ctxValue}>{children}</ModeAction.Provider>;
}
