import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadFile: any = createAsyncThunk(
  "uploadFile",
  async (payload) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/user/uploadFile
`,
      { data: payload },
      {headers:  {"content-type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("art-token")}`}}
    );
    return res.data;
  }
);

export const editFile: any = createAsyncThunk(
  "editFile",
  async (payload, id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/user/updateFile
`,
      { data: payload },
      {headers:  {"content-type": "multipart/form-data", "Authorization": `Bearer ${localStorage.getItem("art-token")}`}}
    );
    return res.data;
  }
);

export const userInfo: any = createAsyncThunk(
  "userInfo",
  async (payload) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/user/userInfo
`,{},
      {headers:  {"Authorization": `Bearer ${localStorage.getItem("art-token")}`}}
    );
    return res.data;
  }
);

export const getUploads: any = createAsyncThunk(
  "getUploads",
  async (payload) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/user/getuploads
`,{},
      {headers:  {"Authorization": `Bearer ${localStorage.getItem("art-token")}`}}
    );
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: {}, uploads: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.fulfilled, (state: any, action) => {
      state.uploads.unshift(action.payload.data)
    });
    builder.addCase(userInfo.fulfilled, (state: any, action) => {
      state.userInfo = action.payload.data
      state.uploads = action.payload.data.uploads
    });
    builder.addCase(getUploads.fulfilled, (state: any, action) => {
      state.uploads = action.payload.data
    });
  },
});

export default userSlice.reducer;
