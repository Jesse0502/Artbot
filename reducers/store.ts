import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice";
import speechSplice from "./speechSplice";
import onload from "./onloadSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
export let store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    nav: navigationReducer,
    speech: speechSplice,
    onload: onload,
  },
});
