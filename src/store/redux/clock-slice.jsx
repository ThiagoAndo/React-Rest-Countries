import { createSlice } from "@reduxjs/toolkit";

const clockSlice = createSlice({
  name: "clock",
  initialState: { inter: null, timer: null , actual:null},
  reducers: {
    startIt(state, action) {
      const { year, month, day, hour, minute, seconds } = action.payload;
      //   state.timer = new Date(
      //     `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
      //   );
      state.timer = new Date(
        `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
      );

      console.log(state.timer);
      //   setTimeout(() => {
      //     state.timer.setSeconds(state.timer.getSeconds() + 1);
      //     state.actual= new Date(
      //       `${state.timer.getFullYear()}-${
      //         state.timer.getMonth() + 1
      //       }-${state.timer.getDate()} ${state.timer.getMinutes()}:${state.timer.getHours()}:${state.timer.getSeconds()}`
      //     );
      //     console.log(state.actual);
      //   }, 1000);

        // setInterval(() => {
        //   thisTimer.setSeconds(thisTimer.getSeconds() + 1);
        //      thisTimer = new Date(
        //       `${thisTimer.getFullYear()}-${
        //         thisTimer.getMonth() + 1
        //       }-${thisTimer.getDate()} ${thisTimer.getHours()}:${thisTimer.getMinutes()}:${thisTimer.getSeconds()}`
        //     );
        //     this.timer =thisTimer
        //   console.log(state.timer);
        // }, 1000);
    },
    clearIt(state) {
      clearInterval(state.inter);
    },
  },
});

export const clockActions = clockSlice.actions;

export default clockSlice;
