import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: "idle",
    users: [],
    list: [],
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    usersReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.users = action.payload;
      }
    },
    getUsers: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { usersLoading, usersReceived, getUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users.list;

export default usersSlice.reducer;
