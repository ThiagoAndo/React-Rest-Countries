import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TodayWeather from "../foreComp/TodayWeather/TodayWeather";
import { fetchWeatherData } from "../api/OpenWeatherService";
import { transformDateFormat } from "../utilities/DatetimeUtils";
import UTCDatetime from "../foreComp/Reusable/UTCDatetime";
import LoadingBox from "../foreComp/Reusable/LoadingBox";
import Logo from "../assets/logo.png";
import ErrorBox from "../foreComp/Reusable/ErrorBox";
import { getTodayForecastWeather } from "../utilities/DataUtils";
import { fetchCities } from "../api/OpenWeatherService";
import { useSelector } from "react-redux";
function ForecastApp({ cap, userCity }) {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const location = useSelector((state) => state.location.loc);

  const searchChangeHandler = async () => {
    let citiesList;
    try {
      citiesList = await fetchCities(cap);

      if (!citiesList.data.legth === 0) {
        setNotFound(true);
      }
    } catch (error) {
      console.log("cities fetch error : " + error);
      setError(true);
    }

    if (citiesList?.data?.length > 0) {
      const dataRet = {
        options: citiesList?.data.map((city) => {
          return {
            value: `${city?.latitude} ${city?.longitude}`,
            label: `${city?.name}, ${city?.countryCode}`,
          };
        }),
      };
      let [latitude, longitude] = dataRet?.options[0]?.value.split(" ");
      if (location.lat != null) {
        latitude = location.lat;
        longitude = location.lon;
      }

      setIsLoading(true);
      const currentDate = transformDateFormat();
      const date = new Date();
      let dt_now = Math.floor(date.getTime() / 1000);

      try {
        const [todayWeatherResponse, weekForecastResponse] =
          await fetchWeatherData(latitude, longitude);
        const all_today_forecasts_list = getTodayForecastWeather(
          weekForecastResponse,
          currentDate,
          dt_now
        );

        setTodayForecast([...all_today_forecasts_list]);
        setTodayWeather({
          city: dataRet?.options[0]?.label,
          ...todayWeatherResponse,
        });
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function loadCoutry() {
      searchChangeHandler(cap);
    }

    loadCoutry();
  }, [cap]);

  let appContent = null;

  if (todayWeather && todayForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12}>
          <TodayWeather data={todayWeather} forecastList={todayForecast} />
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (notFound) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="No weather data found"
        type={"info"}
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "200px",
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              color: "rgba(255, 255, 255, .8)",
              lineHeight: 1,
              fontFamily: "Poppins",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <div className="weather_cont">
      <Grid container columnSpacing={4}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: "100%",
              marginBottom: "1rem",
              padding: "1rem .3rem 0rem",
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: "9px", sm: "17px", md: "20px" },
                width: "auto",
                marginRight: "10px",
              }}
              alt="logo"
              src={Logo}
            />

            <UTCDatetime />
          </Box>
        </Grid>
        {appContent}
      </Grid>
    </div>
  );
}

export default ForecastApp;
