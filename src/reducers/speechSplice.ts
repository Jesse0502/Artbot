import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchResponse: any = createAsyncThunk(
  "speech/fetchResponse",
  async (args: any) => {
    console.log(args);
    let query = args.query;
    let location = args.location;
    const response = await fetch(
      `${process.env.REACT_APP_API_ROOT}/speech?speech=${query}&loc=${location?.lat},${location?.lng}`
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return {
            msg: "Some unexpected error occured!",
            link: null,
          };
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
