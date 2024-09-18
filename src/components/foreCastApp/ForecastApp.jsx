import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TodayWeather from "./TodayWeather/TodayWeather";
import { transformDateFormat } from "../../utilities/DatetimeUtils";
import UTCDatetime from "./Reusable/UTCDatetime";
import LoadingBox from "./Reusable/LoadingBox";
import Logo from "../assets/logo.png";
import ErrorBox from "./Reusable/ErrorBox";
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from "../../utilities/DataUtils";
import { ALL_DESCRIPTIONS } from "../../utilities/DateConstants";
import { fetchCities, fetchWeatherData } from "../../helpers/HTTP";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";
import SectionHeader from "./Reusable/SectionHeader";
function ForecastApp({ cap, call }) {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchPlace = async (cap) => {
    try {
      const citiesList = await fetchCities(cap);
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

  useEffect(() => {
    let ret = null;
    let time = null;

    async function loadCoutry() {
      if (call?.county) {
        ret = await fetchPlace(cap?.try);
        if (ret?.message) {
          searchChangeHandler(ret);
        }

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
  let appContent = null;
  console.log(todayWeather);
  console.log("todayWeather");

  if (todayWeather && todayForecast && call === "country") {
    appContent = (
      <Container>
        <TodayWeather data={todayWeather} forecastList={todayForecast} />
      </Container>
    );
  }

  if (todayWeather && todayForecast && call?.county) {
    let thisBody = null;
    let retName = todayWeather.name.toUpperCase();

    if (call?.today) {
      thisBody = (
        <TodayWeather data={todayWeather} forecastList={todayForecast} />
      );
    } else if (call?.week) {
      thisBody = <WeeklyForecast data={weekForecast} />;
    }
    appContent = (
      <Container>
        {cap?.try != retName ? (
          <SectionHeader
            title={`No data found for ${cap?.try}`}
            cl={"red"}
            sc={"0.7"}
            mb={"-1rem"}
          />
        ) : null}
        {thisBody}
      </Container>
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

function Container({ children }) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        {children}
      </Grid>
    </React.Fragment>
  );
}

export default ForecastApp;
