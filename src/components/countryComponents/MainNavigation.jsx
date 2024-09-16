import { useContext } from "react";
import { ModeAction } from "../../store/context/mode";
import useThisLocation from "../../hooks/useThisLocation";
import { useSelector } from "react-redux";
const key = import.meta.env.VITE_WEATHER_SECRETE_KEY;
function MainNavigation() {
  const context = useContext(ModeAction);
  const { name } = useSelector((state) => state.location.loc);
  const { path, navi } = useThisLocation();
  const msn = path != "/ireland" ? "Show me " : "⬅ Home";

  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={navi}>
          <h2 className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
            {name != null ? (
              <>
                <span>
                  {msn}
                  {msn === "Show me " ? (
                    <span style={{ color: "#f5163b" }}>{name}</span>
                  ) : null}
                </span>
              </>
            ) : (
              <span>Conecting...</span>
            )}
          </h2>
        </div>
        <div id="btn" onClick={context.changeMode}>
          <div className={context.mode ? "" : "filt"}></div>
          <div>
            <p className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
              Light Mode
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
