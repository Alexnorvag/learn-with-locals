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
    getUsers: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { getUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users.list;

export default usersSlice.reducer;
