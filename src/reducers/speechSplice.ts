import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchResponse: any = createAsyncThunk(
  "speech/fetchResponse",
  async (query: string) => {
    console.log(`${process.env.REACT_APP_API_ROOT}/speech?speech=${query}`);
    const response = await fetch(
      `${process.env.REACT_APP_API_ROOT}/speech?speech=${query}`
    )
      .then(async (res) => {
        console.log(res);
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
  reducers: {
    someState: (state: any, action: any) => {},
  },
  extraReducers: async (builder) => {
    builder.addCase(fetchResponse.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});

export const { someState } = speechSlice.actions;
export default speechSlice.reducer;
