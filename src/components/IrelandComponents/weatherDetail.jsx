import ForecastApp from "../foreCastApp/ForecastApp";
import { useLocation } from "react-router-dom";
export default function WeatherDetail() {
  const location = useLocation();
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
      <ForecastApp
        cap={{ try: weather, try_2: COUNTY }}
        call={{ county: true, week: true }}
      />
  );
}
