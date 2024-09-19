import { Grid } from "@mui/material";
import { getDayMonthFromDate } from "../../../../utilities/DatetimeUtils";
import ErrorBox from "../../Reusable/ErrorBox";
import CityDateDetail from "./CityDateDetail";
import TemperatureWeatherDetail from "./TemperatureWeatherDetail";
import Layout from "../../Reusable/Layout";
import { pickImage } from "../../../../utilities/IconsUtils";
import WeatherIconDetail from "./WeatherIconDetail";
import { useWeatherContext } from "../../ForecastApp";
const dayMonth = getDayMonthFromDate();

const Details = ({ data }) => {
  const ctxWeather = useWeatherContext();
  console.log(ctxWeather.shoDetail);
  console.log("ctxWeather");
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        <Grid
          item
          xs={7}
          sx={{
            height: "80px",
          }}
        >
          <CityDateDetail city={data.city} date={dayMonth} />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}
        >
          <TemperatureWeatherDetail
            temperature={data.main.temp}
            description={data.weather[0].description}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
          }}
        >
          {ctxWeather.shoDetail && (
            <WeatherIconDetail src={pickImage(`${data.weather[0].icon}.png`)} />
          )}
        </Grid>
      </>
    );

  return (
    <Layout
      title="CURRENT WEATHER"
      content={content}
      sx={{
        height: "40px",
        with: "100%",
      }}
    />
  );
};

export default Details;
