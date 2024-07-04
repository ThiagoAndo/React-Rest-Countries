import { createContext, useState, useEffect, useRef } from "react";

export const ClockContext = createContext({
  timer: null,
  city: null,
  setCode: () => {},
  run: () => {},
  stop: () => {},
});
let city = null;

async function loadZoneName(coutry) {
  let time = null;
  let zone = null;
  let response;
  try {
    response = await fetch(
      `https://api.timezonedb.com/v2.1/list-time-zone?key=87SX3TYK9QL5&format=json&country=${coutry?.cca2}`
    );
  } catch (error) {
    console.log("loadZone error: " + error);
  }

  if (response?.ok) {
    const resData = await response.json();

    // {countryCode: 'AR', countryName: 'Argentina', zoneName: 'America/Argentina/Ushuaia', gmtOffset: -10800, timestamp: 1719990802}

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
}

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

let hasChang = null;
export default function ClockProvider({ children }) {
  const [timer, setTimer] = useState(null);
  const [country, setCountry] = useState(null);

  let timeInter = useRef();

  const run = () => {
    if (timer != null) timer.setSeconds(timer.getSeconds() + 1);
    const thisTime = new Date(
      `${timer.getFullYear()}-${
        timer.getMonth() + 1
      }-${timer.getDate()} ${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`
    );

    setTimer(thisTime);
  };

  function setCode(cca2, capital) {
    setCountry({ cca2, capital });
    hasChang = false;
  }
  function stop() {
    clearInterval(timeInter.current);
  }

  useEffect(() => {
    async function getTime() {
      if (!hasChang) {
        const timeComp = await loadZoneName(country);
        if (timeComp !== undefined) hasChang = true;
        setTimer(timeComp);
      } else {
        timeInter.current = setInterval(() => {
          run();
        }, 1000);
        return () => {
          clearInterval(timeInter.current);
        };
      }
    }
    getTime();
  }, []);

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
