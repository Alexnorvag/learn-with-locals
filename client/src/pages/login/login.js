import React, { useEffect, useState } from "react";
import httpClient from "../../helpers/httpClient";

const Login = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [fields, setFields] = useState({ username: "admin", password: "admin" });

  useEffect(() => {
    const user = httpClient.getCurrentUser();
    console.log("user: ", user);
  });

  const onSubmitLogin = () => {
    httpClient.logIn(fields).then((user) => {
      setFields({ username: "", password: "" });
      if (user) {
        // this.props.onLoginSuccess(user);
        window.location.href = "/user/";
      }
    });
  };

  return (
    <div className="auth">
      <h1>Sign In</h1>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input className="input" name="username" type="text" placeholder="" />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" name="username" type="text" placeholder="" />
        </div>
      </div>
      <button onClick={onSubmitLogin}>submit</button>
    </div>
  );
};

export default Login;
