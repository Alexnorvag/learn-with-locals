import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import decode from "jwt-decode";
import isEmpty from "lodash-es/isEmpty";
import { authAPI } from "./authAPI";

// Register user
export const register = createAsyncThunk(
  "auth/registerUser",
  async (userInfo) => {
    const response = await authAPI.register(userInfo);
    console.log("[REGISTRED USER] -> res: ", response.data);
    return response.data.token;
  }
);

export const slice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, user: {} },
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.isAuthenticated = !isEmpty(payload);
      state.user = payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");

      state.isAuthenticated = false;
      state.user = {};

      delete axios.defaults.headers.common.Authorization;
      return true;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, { payload: { token } }) => {
      if (token) {
        // sets token as an included header for all subsequent api requests
        axios.defaults.headers.common.Authorization = token;
        localStorage.setItem("token", token);

        const decoded = decode(token);

        state.isAuthenticated = !isEmpty(decoded);
        state.user = decoded;
      }
    },
  },
});

const reducer = slice.reducer;
export default reducer;

export const { setCurrentUser, logout } = authSlice.actions;
