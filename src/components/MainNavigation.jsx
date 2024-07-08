import { useContext} from "react";
import { ModeAction } from "../store/context/mode";
function MainNavigation() {
  const context = useContext(ModeAction);

  return (
    <header>
      <nav className="dark">
        <div id="mainTxt">
          <h2>Where in the world?</h2>
        </div>
        <div id="btn" onClick={context.changeMode}>
          <div className="filt"></div>
          <div>
            <p>Light Mode</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
