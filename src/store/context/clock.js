import { createContext, useState, useEffect, useRef } from "react";

export const ClockContext = createContext({
  timer: null,
  setCode: () => {},
  run: () => {},
  stop: () => {},
});
let time = null;

async function loadZoneName(cca2) {
  let zone = null;
  const response = await fetch(
    `https://api.timezonedb.com/v2.1/list-time-zone?key=87SX3TYK9QL5&format=json&country=${cca2}`
  );
  if (response.ok) {
    const resData = await response.json();
    zone = resData?.zones[0]?.zoneName;
    console.log(zone);
    console.log("zone");
    if (zone === undefined) {
      time = "NOT AVAILABLE";
    } else {
      const time = loadTime(zone);
      return time;
    }
  }
}

async function loadTime(zone) {
  const response = await fetch(
    `https://api.timezonedb.com/v2.1/get-time-zone?key=87SX3TYK9QL5&format=json&by=zone&zone=${zone}`
  );
  if (response.ok) {
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
    timer.setSeconds(timer.getSeconds() + 1);
    const thisTime = new Date(
      `${timer.getFullYear()}-${
        timer.getMonth() + 1
      }-${timer.getDate()} ${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}`
    );

    setTimer(thisTime);
  };

  function setCode(cca2) {
    setCountry(cca2);
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
  }, [hasChang]);

  const ctxValue = {
    timer: timer,
    setCode,
    stop,
  };

  return (
    <ClockContext.Provider value={ctxValue}>{children}</ClockContext.Provider>
  );
}
