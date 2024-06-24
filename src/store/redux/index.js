import { configureStore } from "@reduxjs/toolkit";

import clockSlice from "./clock-slice";

const store = configureStore({
  reducer: { clock: clockSlice.reducer },
});

export default store;
