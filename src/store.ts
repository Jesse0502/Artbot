import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";

export let store = configureStore({
  reducer: {
    nav: navigationReducer,
    //...other reducers
  },
});
