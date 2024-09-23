import ForecastApp from "../components/foreCastApp/ForecastApp";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ModeAction } from "../store/context/mode";

export default function WeatherDetail() {
  const context = useContext(ModeAction);

  const location = useLocation();
  console.log("location")
  console.log(location);
    const attributes = location.state;
    const { COUNTY, ED_ENGLISH } = attributes;

  let weather = null;
  if (ED_ENGLISH.includes(" ")) {
    weather = ED_ENGLISH.split(" ")[0];
  } else if (ED_ENGLISH.includes("-")) {
    weather = ED_ENGLISH.split("-")[0];
  } else {
    weather = ED_ENGLISH;
  }
  return (
    <section id="weather_detail" className={context.mode ? "blight" : "bDark"}>
    <ForecastApp
      cap={{ try: weather, try_2: COUNTY }}
      call={{ county: true, week: true }}

    />
    </section>

  );
}
