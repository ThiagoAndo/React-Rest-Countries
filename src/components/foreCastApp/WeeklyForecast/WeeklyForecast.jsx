import React from "react";
import { Grid } from "@mui/material";
import { getWeekDays } from "../../../utilities/DatetimeUtils";
import WeeklyForecastItem from "./WeeklyForecastItem";
import ErrorBox from "../Reusable/ErrorBox";
import UnfedForecastItem from "./UnfedForecastItem";
import DayWeatherDetails from "./DayWeatherDetails";
import Layout from "../Reusable/Layout";
import img from "../../assets/icons/01d.png";
import { pickImage } from "../../../utilities/IconsUtils";
import { ModeAction } from "../../../store/context/mode";
import { useContext } from "react";

const WeeklyForecast = ({ data }) => {
  const context = useContext(ModeAction);

  const forecastDays = getWeekDays();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  let content = (
    <div style={{ width: "100%" }}>
      <ErrorBox type="error" />
    </div>
  );

  if (!noDataProvided)
    content = (
      <Grid
        item
        container
        display="flex"
        flexDirection="column"
        xs={12}
        gap="4px"
        // sx={{background:"red"}}
      >
        {data.list.map((item, idx) => {
          return (
            <Grid
              item
              key={idx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{

                padding: "2px 0 2px",
                background:
                  "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                borderRadius: "8px",
              }}
            >
              <DayWeatherDetails
                day={forecastDays[idx]}
                src={pickImage(item.icon)}
                description={item.description}
              />

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WeeklyForecastItem
                  type="temperature"
                  value={Math.round(item.temp) + " °C"}
                />
                <WeeklyForecastItem type="clouds" value={item.clouds + " %"} />
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WeeklyForecastItem type="wind" value={item.wind + " m/s"} />
                <WeeklyForecastItem
                  type="humidity"
                  value={item.humidity + " %"}
                />
              </Grid>
            </Grid>
          );
        })}
        {data.list.length === 5 && (
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              padding: "2px 0 2px",
              background:
                "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              borderRadius: "8px",
            }}
          >
            <UnfedForecastItem day={forecastDays[5]} value="NaN" src={img} />
          </Grid>
        )}
      </Grid>
    );

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={content}
      mb=".8rem"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem ",
        borderRadius: "1rem",
        marginTop: { xs: "1rem", sm: "1rem", md: "-1.5rem" },
        background: context.mode ? "#0000001a" : null,
      }}
    />
  );
};

export default WeeklyForecast;
