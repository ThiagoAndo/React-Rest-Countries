import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TodayWeather from "../foreComp/TodayWeather/TodayWeather";
import { transformDateFormat } from "../../utilities/DatetimeUtils";
import UTCDatetime from "../foreComp/Reusable/UTCDatetime";
import LoadingBox from "../foreComp/Reusable/LoadingBox";
import Logo from "../assets/logo.png";
import ErrorBox from "../foreComp/Reusable/ErrorBox";
import { getTodayForecastWeather } from "../../utilities/DataUtils";
import { getWeekForecastWeather } from "../../utilities/DataUtils";
import { ALL_DESCRIPTIONS } from "../../utilities/DateConstants";
import { fetchCities, fetchWeatherData } from "../../helpers/HTTP";
import WeeklyForecast from "../foreComp/WeeklyForecast/WeeklyForecast";
let count = 0;
function ForecastApp({ cap, county }) {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchPlace = async (cap) => {
    try {
      const citiesList = await fetchCities(cap);
      console.log(citiesList);
      console.log("citiesList");
      return citiesList;
    } catch (error) {
      return { error };
    }
  };

  const searchChangeHandler = async (citiesList) => {
    if (citiesList?.message) {
      setError(true);
    } else if (citiesList.data.length === 0) {
      setNotFound(true);
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
      const [latitude, longitude] = dataRet?.options[0]?.value.split(" ");
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
        const all_week_forecasts_list = getWeekForecastWeather(
          weekForecastResponse,
          ALL_DESCRIPTIONS
        );
        setTodayForecast([...all_today_forecasts_list]);
        setTodayWeather({
          city: dataRet?.options[0]?.label,
          ...todayWeatherResponse,
        });
        setWeekForecast({
          city: dataRet.options[0].label,
          list: all_week_forecasts_list,
        });
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    }
  };
  console.log("weekForecast");
  console.log(weekForecast);
  useEffect(() => {
    let ret = null;
    let time = null;

    async function loadCoutry() {
      if (county) {
        ret = await fetchPlace(cap?.try);
        console.log(ret);
        if (ret?.message) {
          searchChangeHandler(ret);
        }
        // console.log("ret");
        // console.log(ret);
        // searchChangeHandler(ret);

        if (ret?.data.length > 0) {
          searchChangeHandler(ret);
        }

        if (ret?.data.length === 0) {
          time = setTimeout(async () => {
            ret = await fetchPlace(cap?.try_2);
            searchChangeHandler(ret);
          }, 1000);
        }
      } else {
        ret = await fetchPlace(cap);
        searchChangeHandler(ret);
      }
    }
    loadCoutry();
    return () => {
      clearInterval(time);
    };
  }, [cap]);
  console.log("count");
  console.log(count);
  let appContent = null;
  // console.log(todayForecast);
  // console.log("weekForecast");

  if (todayWeather && todayForecast) {
    appContent = (
      <React.Fragment>
        {/* <Grid item xs={12}>
          <TodayWeather data={todayWeather} forecastList={todayForecast} />
        </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <WeeklyForecast data={weekForecast} />
        </Grid> */}
      </React.Fragment>
    );
  }

  if (error) {
    console.log("r");
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
  );
}

export default ForecastApp;
