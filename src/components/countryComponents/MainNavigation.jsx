import { useContext, useState, useEffect } from "react";
import { ModeAction } from "../../store/context/mode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { locAction } from "../../store/redux/location";
import { getInfo, preparName } from "../../helpers/userLocation";
const key = import.meta.env.VITE_WEATHER_SECRETE_KEY;

function MainNavigation() {
  const context = useContext(ModeAction);
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.location.loc);
  function setNavigation() {
    navigate("/ireland");
  }
  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={setNavigation}>
          <h2 className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
            {name != null ? (
              <>
                <span>Show me </span>
                <span style={{ color: "#f5163b" }}>{name}</span>
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
