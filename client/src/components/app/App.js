import React /* , { useEffect } */ from "react";
import { Link } from "react-router-dom";
// import { Counter } from "./features/counter/Counter";
// import httpClient from "../../helpers/httpClient";
import Routes from "../routes";
import "./App.css";

const App = () => {
  // useEffect(() => {
  //   const curr = httpClient.getCurrentUser();
  //   console.log("curr: ", curr);
  // }, []);

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="nav-container">
          <div className="nav-header">
            <p className="nav-brand">Scotch Book</p>
          </div>
          <div className="nav-collapse">
            <ul className="nav-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/books">Book</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes />
    </div>
  );
};

export default App;
