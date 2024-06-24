import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "clock",
  initialState: { inter: null, timer:null },
  reducers: {
    startIt(state, action) {
        state.timer = action.payload.timer;
      state.inter = setInterval(() => {
        state.timer.setSeconds(state.timer.getSeconds() + 1);
        const thisTime = new Date(
          `${state.timer.getFullYear()}-${
            state.timer.getMonth() + 1
          }-${state.timer.getDate()} ${state.timer.getHours()}:${state.timer.getHours()}:${state.timer.getSeconds()}`
        );
        console.log(thisTime);
      }, 1000);
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
