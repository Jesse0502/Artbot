import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationSlice";
import speechSplice from "./reducers/speechSplice";
export let store = configureStore({
  reducer: {
    nav: navigationReducer,
    speech: speechSplice,
  },
});
