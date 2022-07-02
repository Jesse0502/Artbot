import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";
import speechSplice from "./reducers/speechSplice";
import onload from "./reducers/onloadSlice";
import activitySlice from "./reducers/activitySlice";
import authSlice from "./reducers/authSlice";

export let store = configureStore({
  reducer: {
    auth: authSlice,
    activity: activitySlice,
    nav: navigationReducer,
    speech: speechSplice,
    onload: onload,
  },
});
