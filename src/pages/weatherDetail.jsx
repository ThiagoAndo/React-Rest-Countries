import ForecastApp from "../components/foreCastApp/ForecastApp";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ModeAction } from "../store/context/mode";

export default function WeatherDetail() {
  const context = useContext(ModeAction);
  let call = {};
  let places = {};
  let weather = null;

  const location = useLocation();
  const isCounty = location?.state?.COUNTY;
  if (isCounty) {
    const attributes = location.state;
    const { COUNTY, ED_ENGLISH } = attributes;
    if (ED_ENGLISH.includes(" ")) {
      weather = ED_ENGLISH.split(" ")[0];
    } else if (ED_ENGLISH.includes("-")) {
      weather = ED_ENGLISH.split("-")[0];
    } else {
      weather = ED_ENGLISH;
    }
    places = { try: weather, try_2: COUNTY };
    call = { county: true, full: true };
  }


  
  return (
    <section id="weather_detail" className={context.mode ? "blight" : "bDark"}>
      <ForecastApp
        cap={isCounty ? { ...places } : null}
        call={isCounty ? { ...call } : null}
      />
    </section>
  );
}
