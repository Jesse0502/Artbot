import { createSlice } from "@reduxjs/toolkit";
// import jwt from "jsonwebtoken";

import jwtDecode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, loginInfo: {} },
  reducers: {
    handleLogin: (state: any, action: any) => {
      state.isAuthenticated = true;
      setTimeout(() => {
        state.isAuthenticated = false;
      }, 10000);
    },
    checkAuth: (state: any, action: any) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const user = jwtDecode(token);
      if (!user) return;
      state.loginInfo = user;
      state.isAuthenticated = true;
    },
  },
});

export const { checkAuth, handleLogin } = authSlice.actions;
export default authSlice.reducer;
