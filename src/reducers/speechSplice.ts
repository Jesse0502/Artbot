import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchResponse: any = createAsyncThunk(
  "speech/fetchResponse",
  async (args: any) => {
    console.log(args);
    let query = args.query;
    let location = args.location;
    let uid = args.uid;
    const response = await fetch(
      `${process.env.REACT_APP_API_ROOT}/speech?speech=${query}&loc=${
        location?.lat
      },${location?.lng}&token=${localStorage.getItem("art-token")}`
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
    return { response, queryId: uid };
  }
);

export const fetchResponses: any = createAsyncThunk(
  "speech/getResponses",
  async (length: number) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/user/getResponses?len=${length}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("art-token")}`,
        },
      }
    );

    if (response.status !== 200) return "Some error occurred!";
    console.log(response);
    return { response: response.data };
  }
);

const speechSlice = createSlice({
  name: "speech",
  initialState: {
    response: "",
    // @ts-ignore
    responses: [],
    session: null,
  },
  reducers: {
    addQuery: (state: any, action: any) => {
      state.responses.unshift({
        query: action.payload.query,
        recieve_time: new Date(),
        queryId: action.payload.uid,
      });
    },
    removeSession: (state: any, action: any) => {
      state.session = null;
    },
  },
  extraReducers: async (builder) => {
    builder.addCase(fetchResponse.fulfilled, (state: any, action: any) => {
      state.response = action.payload.response;
      let newResp = state.responses.map((resp: any) => {
        if (
          resp.hasOwnProperty("queryId") &&
          resp.queryId === action.payload.queryId
        ) {
          return {
            ...resp,
            response: action.payload.response.msg,
            response_time: new Date(),
          };
        }
        return resp;
      });
      if (action.payload.response.hasOwnProperty("session"))
        state.session = action.payload.response.session;

      state.responses = newResp;
    });
    builder.addCase(fetchResponses.fulfilled, (state: any, action: any) => {
      state.responses = action.payload.response.data;
      localStorage.setItem(
        "responses",
        JSON.stringify(action.payload.response.data)
      );
    });
  },
});

export const { addQuery, removeSession } = speechSlice.actions;
export default speechSlice.reducer;
