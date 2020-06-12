import React from "react";
import { UsersList } from "../../features/users/usersList";

const About = () => {
  return (
    <div>
      <h1>About Page</h1>

      <p>Here showed list of users</p>
      <UsersList />
    </div>
  );
};

export default About;
