import { createSlice } from "@reduxjs/toolkit";

const onloadSlice = createSlice({
  name: "onload",
  initialState: { loc: {} },
  reducers: {},
  extraReducers: async (builder) => {},
});

export default onloadSlice.reducer;
