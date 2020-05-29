import React from "react";

const Register = () => {
  return (
    <div className="register">
      <h1>Sign Up</h1>
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
    </div>
  );
};

export default Register;
