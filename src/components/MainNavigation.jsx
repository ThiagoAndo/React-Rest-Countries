import { useContext, useState, useEffect } from "react";
import { ModeAction } from "../store/context/mode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { locAction } from "../store/redux/location";
import {  preparName } from "./utilities/userLocation";
const key = import.meta.env.VITE_WEATHER_SECRETE_KEY;

function MainNavigation() {
  const context = useContext(ModeAction);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [locationName, setLocationName] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function showPosition( position) {
        const { latitude: lat, longitude: lon } = position.coords;
        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${key}`
        );
        if (res.status === 200) {
          setLocationName(preparName(getLocation()));
        }
        
      });
    }
  }

  
  useEffect(() => {
    getLocation();
  }, []);


  


  console.log(locationName);
  function setLocation() {
    dispatch(
      locAction.setLoc({
        lon: locationData.longitude,
        lat: locationData.latitude,
      })
    );
    navigate(`/${locationData.country_name_official}`, {
      state: locationData.city,
    });
  }

  return (
    <header>
      <nav className={context.mode ? "light" : "dark"}>
        <div id="mainTxt" onClick={setLocation}>
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
