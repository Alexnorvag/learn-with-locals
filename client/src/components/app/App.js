import React, { useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
// import { Counter } from "./features/counter/Counter";
import httpClient from "../../helpers/httpClient";
import "./App.css";

const App = ({ children }) => {
  useEffect(() => {
    const curr = httpClient.getCurrentUser();
    console.log("curr: ", curr);
  }, []);

  return (
    // <Router>
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="nav-container">
            <div className="nav-header">
              <a className="nav-brand" href="#">
                Scotch Book
              </a>
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
        {children}
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Login />
          <Register />
          <Book />
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Counter />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header> */}
      </div>
    // </Router>
  );
};

export default App;
