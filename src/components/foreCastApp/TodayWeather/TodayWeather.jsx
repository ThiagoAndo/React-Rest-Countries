import { Grid } from "@mui/material";
import AirConditions from "./AirConditions/AirConditions";
import Details from "./Details/Details";
import DailyForecast from "./Forecast/DailyForecast";
import { ModeAction } from "../../../store/context/mode";
import { useContext } from "react";
const TodayWeather = ({
  data,
  forecastList = null,
  padding = "2rem 0.3rem 1rem",
}) => {
  const context = useContext(ModeAction);

  return (
    <Grid
      container
      sx={{
        padding: padding,
        borderRadius: "1rem",
        background: context.mode ? "#0000001a" : null,
      }}
    >
      <Details data={data} />
      <AirConditions data={data} />
      {forecastList != null ? (
        <DailyForecast data={data} forecastList={forecastList} />
      ) : null}
    </Grid>
  );
};

export default TodayWeather;
