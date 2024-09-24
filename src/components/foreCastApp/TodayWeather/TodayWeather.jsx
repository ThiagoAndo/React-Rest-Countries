import { Grid } from "@mui/material";
import AirConditions from "./AirConditions/AirConditions";
import Details from "./Details/Details";
import DailyForecast from "./Forecast/DailyForecast";
const TodayWeather = ({ data, forecastList = null }) => {
  return (
    <Grid container sx={{ padding: "2rem 0rem 0rem" }}>
      <Details data={data} />
      <AirConditions data={data} />
      {forecastList != null ? (
        <DailyForecast data={data} forecastList={forecastList} />
      ) : null}
    </Grid>
  );
};

export default TodayWeather;
