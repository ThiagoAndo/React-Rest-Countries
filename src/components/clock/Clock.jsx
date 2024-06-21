import React, { useState, useRef, useEffect } from "react";

let time = null;
// let d = new Date("2024-06-13T17:37:58.751884+01:00");
// d.setSeconds(d.getSeconds() + 1);
// d.setSeconds(d.getSeconds() + 1);
// console.log(d.getMinutes() + ':' + d.getSeconds()); //12:05
// console.log(state);

async function loadTime(region, name, capital) {
  const response = await fetch(
    `http://worldtimeapi.org/api/timezone/${region}/${name}/${capital}`
  );

  if (!response.ok) {
  } else {
    const resData = await response.json();
    console.log(resData);
    time = new Date(resData.datetime);
  }
}

function Clock({ region, name, capital }) {
  console.log(region + " " + name+" " + capital);
  const [timer, setTimer] = useState(time);

  // let inter = useRef();

  // const startIt = () => {
  //   clearInterval(inter.current);
  //   inter.current = setInterval(() => {
  //     setTimer(time.setSeconds(time.getSeconds() + 1));
  //   }, 1000);
  // };
  // startIt();

  useEffect(() => {
    if (time === null) {
      loadTime(region, name, capital);
    }
  }, []);
  return (<h1>clock</h1>
    // <>
    //   <div className="clock">
    //     <div
    //       className="hour_hand"
    //       style={{
    //         transform: `rotateZ(${time.getHours() * 30}deg)`,
    //       }}
    //     />
    //     <div
    //       id="min_hand"
    //       style={{
    //         transform: `rotateZ(${time.getMinutes() * 6}deg)`,
    //       }}
    //     />
    //     <div
    //       className="sec_hand"
    //       style={{
    //         transform: `rotateZ(${time.getSeconds() * 6}deg)`,
    //       }}
    //     />
    //     <span className="twelve">12</span>
    //     <span className="one">1</span>
    //     <span className="two">2</span>
    //     <span className="three">3</span>
    //     <span className="four">4</span>
    //     <span className="five">5</span>
    //     <span className="six">6</span>
    //     <span className="seven">7</span>
    //     <span className="eight">8</span>
    //     <span className="nine">9</span>
    //     <span className="ten">10</span>
    //     <span className="eleven">11</span>
    //     <h3>{capital}</h3>
    //   </div>
    // </>
  );
}

export default Clock;
