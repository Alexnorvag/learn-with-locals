import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  removeUser,
  selectTotalUsers,
  selectAllUsers,
} from "./usersSlice";

export const UsersList = () => {
  const count = useSelector(selectTotalUsers);
  const users = useSelector(selectAllUsers);
  const usersLoading = useSelector((state) => state.users.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("COUNT: ", count);
  }, [count]);

  useEffect(() => {
    console.log("usersLoading: ", usersLoading);
  }, [usersLoading]);

  return (
    <div>
      <div>
        <button
          aria-label="Fetch Users"
          disabled={usersLoading}
          onClick={() => dispatch(fetchUsers())}
        >
          Fetch Users
        </button>
      </div>
    </div>
  );
};
