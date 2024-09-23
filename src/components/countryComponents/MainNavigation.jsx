import { useContext } from "react";
import { ModeAction } from "../../store/context/mode";
import useThisLocation from "../../hooks/useThisLocation";
import { useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";

function MainNavigation() {
  const context = useContext(ModeAction);
  const { isBlocked } = useContext(ModeAction);
  const { name } = useSelector((state) => state.location.loc);
  const { path, navi } = useThisLocation();
  const msn = path != "/ireland" ? "Show me " : "⬅ Home";

  function handleAlert() {
    alert("Mode temporarily disabled");
  }

  let content = null;

  if ((path === "/ireland" || path === "/") && name != null) {
    content = (
      <h2 className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
        <>
          {
            <span>
              {msn}
              {msn === "Show me " ? (
                <span style={{ color: "#f5163b" }}>{name}</span>
              ) : null}
            </span>
          }
        </>
      </h2>
    );
  }

  if (name === null) {
    content = (
      <h2 className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
        <span>
          <Triangle
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="triangle-loading"
          />
        </span>
      </h2>
    );
  }

  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={name != null ? navi : null}>
          {content}
        </div>
        <div id="btn" onClick={context.changeMode}>
          {isBlocked ? (
            <>
              <div className={context.mode ? "icon" : "icon filt"}></div>
              <div>
                <p className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
                  Light Mode
                </p>
              </div>
            </>
          ) : (
            <p
              onClick={handleAlert}
              style={{ scale: "2" }}
              className="mainTxt_h"
            >
              🚫
            </p>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
