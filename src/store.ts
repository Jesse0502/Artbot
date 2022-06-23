import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";
import speechSplice from "./reducers/speechSplice";
import onload from "./reducers/onloadSlice";
export let store = configureStore({
  reducer: {
    nav: navigationReducer,
    speech: speechSplice,
    onload: onload,
  },
});
