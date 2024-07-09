import { useContext } from "react";
import { ModeAction } from "../store/context/mode";
function MainNavigation() {
  const context = useContext(ModeAction);

  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt">
          <h2>Where in the world?</h2>
        </div>
        <div id="btn" onClick={context.changeMode}>
          <div className={context.mode ? "" : "filt"}></div>
          <div>
            <p>Light Mode</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
