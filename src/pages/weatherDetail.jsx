import ForecastApp from "../components/foreCastApp/ForecastApp";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ModeAction } from "../store/context/mode";
import { resetCount } from "../components/foreCastApp/ForecastApp";

export default function WeatherDetail() {
  resetCount();
  const context = useContext(ModeAction);
  const location = useLocation();
  return (
    <section id="weather_detail" className={context.mode ? "blight" : "bDark"}>
      <ForecastApp cap={location.state} call={{ full: true }} />
    </section>
  );
}
