import { useContext, useState, useEffect } from "react";
import { ModeAction } from "../../store/context/mode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { locAction } from "../../store/redux/location";
import { getInfo, preparName } from "../../helpers/userLocation";
const key = import.meta.env.VITE_WEATHER_SECRETE_KEY;

function MainNavigation() {
  const context = useContext(ModeAction);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [locationName, setLocationName] = useState(undefined);
  useEffect(() => {
    if (locationName === undefined) getLocationName();
  }, []);

  async function getLocationName() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function showPosition(
        position
      ) {
        const { latitude: lat, longitude: lon } = position.coords;
        dispatch(locAction.setLoc({ lon, lat }));
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${key}`
        );
        if (res.status === 200) {
          console.log(preparName(res.data[0].name));
          setLocationName(preparName(res.data[0].name));
          getLocationInfo(preparName(res.data[0].name));
        }
      });
    }
  }
  async function getLocationInfo(place) {
    const res = await axios.get(
      "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Census2016_Theme1Table2_ED/FeatureServer/0/query?where=1%3D1&outFields=ED_ENGLISH,T1_1AGETM,T1_1AGETF,T1_1AGETT,T1_2SGLM,T1_2SGLF,T1_2TF,COUNTY,CONTAE,PROVINCE,T1_2TM,T1_2SGLT&returnGeometry=false&outSR=4326&f=json"
    );
    if (res.status === 200) {
      dispatch(locAction.setDistricts(getInfo(res.data, place)));
    }
  }

  function setNavigation() {
    navigate("/ireland");
  }

  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={setNavigation}>
          <h2 className={context.mode ? "mainTxt_h" : " mainTxt_h2"}>
            {locationName != null ? (
              <>
                <span>Show me </span>
                <span style={{ color: "#f5163b" }}>{locationName}</span>
              </>
            ) : (
              <span>No conection to the internet</span>
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
