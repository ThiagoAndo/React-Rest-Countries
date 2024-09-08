import { useContext, useState, useEffect } from "react";
import { ModeAction } from "../store/context/mode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { locAction } from "../store/redux/location";
function MainNavigation() {
  const context = useContext(ModeAction);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [locationData, setLocationData] = useState(null);
  useEffect(() => {
    getLocation();
  }, []);
  async function getLocation() {
    // resource https://dev.to/abidullah786/how-to-access-user-location-in-react-3odj
    const res = await axios.get("http://ip-api.com/json");
    if (res.status === 200) {
      setLocationData(res.data);
    }
  }
  function myLocation() {
    dispatch(
      locAction.setLoc({ lon: locationData.lon, lat: locationData.lat })
    );
    navigate(`/${locationData.country}`);
  }
  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={myLocation}>
          <h2 className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
            {`Show me  ${locationData && locationData.city}`}
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
