import ForecastApp from "../components/foreCastApp/ForecastApp";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ModeAction } from "../store/context/mode";
import { resetCount } from "../components/foreCastApp/ForecastApp";

export default function WeatherDetail() {
  resetCount();
  const context = useContext(ModeAction);
  let call = {};
  let places = {};
  let county = null;
  const location = useLocation();
  const isCounty = location?.state?.COUNTY;
  if (isCounty) {
    const attributes = location.state;
    const { COUNTY, ED_ENGLISH, PROVINCE } = attributes;
    if (ED_ENGLISH.includes(" ")) {
      county = ED_ENGLISH.split(" ")[0];
    } else if (ED_ENGLISH.includes("-")) {
      county = ED_ENGLISH.split("-")[0];
    } else {
      county = ED_ENGLISH;
    }
    county = county[0] + county.slice(1, county.length).toLowerCase();

    places = { try: county, try_2: COUNTY, try_3: PROVINCE ,country: "IE" };
    call = { county: true, full: true };
  } else {
    places = location.state;
    call = { country: true, full: true };
  }
  return (
    <section id="weather_detail" className={context.mode ? "blight" : "bDark"}>
      <ForecastApp cap={isCounty ? { ...places } : places} call={{ ...call }} />
    </section>
  );
}
