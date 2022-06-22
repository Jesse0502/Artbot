import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchResponse: any = createAsyncThunk(
  "speech/fetchResponse",
  async (query: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ROOT}/speech?speech=${query}`
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        return result;
      });
    if (!response) return "Some error occurred!";
    return response;
  }
);

const speechSlice = createSlice({
  name: "speech",
  initialState: { response: "" },
  reducers: {},
  extraReducers: async (builder) => {
    builder.addCase(fetchResponse.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});

export const {} = speechSlice.actions;
export default speechSlice.reducer;
