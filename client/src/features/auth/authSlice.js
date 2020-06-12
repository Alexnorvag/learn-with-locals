import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import decode from "jwt-decode";
import isEmpty from "lodash-es/isEmpty";

// Register user
export const register = createAsyncThunk("auth/registerUser", async user => {
    const {data} = await 
})


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

      delete this.defaults.headers.common.Authorization;
      return true;
    },
  },
  extraReducers: {
      [] : (state, {payload: {token}}) => {

      }
  },
});
