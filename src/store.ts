import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";
import speechSplice from "./reducers/speechSplice";
import onload from "./reducers/onloadSlice";
import activitySlice from "./reducers/activitySlice";

export let store = configureStore({
  reducer: {
    activity: activitySlice,
    nav: navigationReducer,
    speech: speechSplice,
    onload: onload,
  },
});
