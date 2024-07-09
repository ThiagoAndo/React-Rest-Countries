import { createContext, useState, useEffect, useRef, useCallback } from "react";

export const ClockContext = createContext({
  timer: null,
  city: null,
  setCode: () => {},
  run: () => {},
  stop: () => {},
});
let city = null;
export default function ClockProvider({ children }) {
  const [timer, setTimer] = useState(null);
  const [country, setCountry] = useState(null);
  const [change, setChange] = useState(false);
  let timeInter = useRef();
const WEATHER_API_KEY = import.meta.env.VITE_TIME_ZONE_KEY;


  const loadZoneName = useCallback(async function loadZoneName(coutry) {
    let time = null;
    let zone = null;
    let response;
    try {
      response = await fetch(
        `${WEATHER_API_KEY}${coutry?.cca2}`
      );
    } catch (error) {
      console.log("loadZone error: " + error);
    }

    if (response?.ok) {
      const resData = await response.json();

      const cities = resData.zones.map((zn) => {
        const cts = zn.zoneName.split("/");
        return cts[cts.length - 1];
      });

      if (cities.includes(coutry?.capital)) {
        const zn = cities.indexOf(coutry?.capital);
        zone = resData?.zones[zn]?.zoneName;

        city = coutry.capital;
      } else {
        zone = resData?.zones[0]?.zoneName;
        city = resData?.zones[0]?.zoneName.split("/")[1];
      }

      if (city?.includes("_") || city?.includes("-")) {
        city = city.replaceAll("_", " ");
        city = city.replaceAll("-", " ");
      }

      if (zone === undefined) {
        time = "NOT AVAILABLE";
      } else {
        time = loadTime(zone);
        return time;
      }
    }
  }, []);

  async function loadTime(zone) {
    let response;
    let time = null;

    try {
      response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=87SX3TYK9QL5&format=json&by=zone&zone=${zone}`
      );
    } catch (error) {
      console.log("loadTime error: " + error);
    }
    if (response?.ok) {
      const resData = await response.json();
      time = new Date(resData.formatted);
      return time;
    }
  }

  const run = useCallback(function run(timer) {
    if (timer != null) timer.setSeconds(timer.getSeconds() + 1);
    const thisTime = new Date(
      `${timer.getFullYear()}-${
        timer.getMonth() + 1
      }-${timer.getDate()} ${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`
    );

    setTimer(thisTime);
  }, []);

  function setCode(cca2, capital) {
    const thisCoutry = { cca2, capital };
    setCountry(thisCoutry);
    setChange(false);
    clearInterval(timeInter.current);
  }
  function stop() {
    clearInterval(timeInter.current);
  }

  useEffect(() => {
    async function getTime() {
      if (!change) {
        const timeComp = await loadZoneName(country);
        if (timeComp !== undefined) {
          setTimer(timeComp);
          setChange(true);
        }
      } else {
        timeInter.current = setInterval(() => {
          run(timer);
        }, 1000);
        return () => {
          clearInterval(timeInter.current);
        };
      }
    }
    getTime();
  }, [change, country]);

  const ctxValue = {
    timer: timer,
    city,
    setCode,
    stop,
  };

  return (
    <ClockContext.Provider value={ctxValue}>{children}</ClockContext.Provider>
  );
}
