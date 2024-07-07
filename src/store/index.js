import appSlice from "./app/appSlice";

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
