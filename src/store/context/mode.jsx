import { createContext, useState } from "react";

export const ModeAction = createContext({
  mode: null,
  changeMode: () => {},
  blockMode: () => {},
  unblockMode: () => {},
});

export default function ModeProvider({ children }) {
  const [mode, setMode] = useState(false);
  const [block, setBlock] = useState(true);
  function changeMode() {
    if (block) {
      setMode((prev) => {
        return (prev = !prev);
      });
    }
  }
  function blockMode() {
    setBlock(false);
  }
  function unblockMode() {
    setBlock(true);
  }
// console.log(block)
  const ctxValue = {
    mode,
    changeMode,
    unblockMode,
    blockMode,
  };

  return <ModeAction.Provider value={ctxValue}>{children}</ModeAction.Provider>;
}
