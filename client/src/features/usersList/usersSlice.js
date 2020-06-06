import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    getUsers: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { getUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users.list;

export default usersSlice.reducer;
