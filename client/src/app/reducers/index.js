import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../../features/counter/counterSlice";
import usersSlice from "../../features/usersList/usersSlice";

export default combineReducers({
  counter: counterReducer,
  users: usersSlice,
});
