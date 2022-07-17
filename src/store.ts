import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";
import speechSplice from "./reducers/speechSplice";
import onload from "./reducers/onloadSlice";
import authSlice from "./reducers/authSlice";

export let store = configureStore({
  reducer: {
    auth: authSlice,
    nav: navigationReducer,
    speech: speechSplice,
    onload: onload,
  },
});
