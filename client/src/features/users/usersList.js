import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  removeUser,
  selectTotalUsers,
  selectAllUsers,
} from "./usersSlice";

export default UserList = () => {
  const count = useSelector(selectTotalUsers);
  const users = useSelector(selectAllUsers);
  const usersLoading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button>Fetch Users</button>
      </div>
    </div>
  );
};
