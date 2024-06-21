import React, { useState, useRef, useEffect } from "react";

let time = null;
async function loadZoneName(cca2) {
  let zone = null;
  const response = await fetch(
    `https://api.timezonedb.com/v2.1/list-time-zone?key=87SX3TYK9QL5&format=json&country=${cca2}`
  );
  if (response.ok) {
    const resData = await response.json();
    zone = resData?.zones[0]?.zoneName;
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
    // time = new Date(resData.formatted);
    time = new Date("2024-06-13T17:37:55.751884+01:00");
    return time;
  }
}
let timeComp = null;
function Clock({ cca2, name }) {
  const [timer, setTimer] = useState(null);
  const [hasChang, setHasChang] = useState(false);
  let inter = useRef();

  const startIt = () => {
    inter.current.clearIterval()
    inter.current = setInterval(() => {
      timer.setSeconds(timer.getSeconds() + 1);
      const thisTime = new Date(
        `${timer.getFullYear()}-${
          timer.getMonth() + 1
        }-${timer.getDate()} ${timer.getHours()}:${timer.getHours()}:${timer.getSeconds()}`
      );
      console.log(thisTime);

      setTimer(thisTime);
    }, 1000);
  };
  useEffect(() => {
    async function getTime() {
      if (!hasChang) {
        timeComp = await loadZoneName(cca2);
        setTimer(timeComp);
        setHasChang(true);
      } else {
        startIt();
      }
    }
    getTime();
  }, [hasChang]);

  return (
    <div className="clock">
      {timer === null ? null : (
        <>
          <div
            className="hour_hand"
            style={{
              transform: `rotateZ(${timer.getHours() * 30}deg)`,
            }}
          />
          <div
            id="min_hand"
            style={{
              transform: `rotateZ(${timer.getMinutes() * 6}deg)`,
            }}
          />
          <div
            className="sec_hand"
            style={{
              transform: `rotateZ(${timer.getSeconds() * 6}deg)`,
            }}
          />
        </>
      )}
      <span className="twelve">12</span>
      <span className="one">1</span>
      <span className="two">2</span>
      <span className="three">3</span>
      <span className="four">4</span>
      <span className="five">5</span>
      <span className="six">6</span>
      <span className="seven">7</span>
      <span className="eight">8</span>
      <span className="nine">9</span>
      <span className="ten">10</span>
      <span className="eleven">11</span>
      <h3>{name}</h3>
    </div>
  );
}

export default Clock;
