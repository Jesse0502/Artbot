import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { ServerUrl } from "@/helpers/constants";

export const handleLogin: any = createAsyncThunk(
  "handleLogin",
  async (payload) => {
    const res = await axios.post(`${ServerUrl}/auth/login`, { data: payload });
    return res.data;
  }
);

export const handleSignup: any = createAsyncThunk(
  "handleSignup",
  async (payload) => {
    const res = await axios.post(
      `${ServerUrl}/auth/signup`,
      { data: payload },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("art-token")}`,
        },
      }
    );
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, loginInfo: {} },
  reducers: {
    checkAuth: (state: any, action: any) => {
      const token = localStorage.getItem("art-token");
      if (!token) return;
      const user = jwtDecode(token);
      if (!user) return;
      state.loginInfo = user;
      state.isAuthenticated = true;
    },
    logout: (state: any, action: any) => {
      state.isAuthenticated = false;
      state.loginInfo = {};
      localStorage.removeItem("art-token");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state: any, action) => {
      if (!action.payload.data.token) return;
      const user = jwtDecode(action.payload.data.token);
      if (!user) return;
      state.isAuthenticated = true;
      state.loginInfo = user;
      localStorage.setItem("art-token", action.payload.data.token);
    });
  },
});

export const { checkAuth, logout } = authSlice.actions;
export default authSlice.reducer;
