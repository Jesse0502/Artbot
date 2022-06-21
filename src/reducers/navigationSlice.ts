import { createSlice } from "@reduxjs/toolkit";
const navigationSlice = createSlice({
  name: "nav",
  initialState: { tab: { index: 0, name: "Home" } },
  reducers: {
    setTab(state: any, action: any) {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = navigationSlice.actions;
export default navigationSlice.reducer;
