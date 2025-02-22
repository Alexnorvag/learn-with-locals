import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./app/store";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/app/App";
// import Routes from "./components/routes/routes";

import * as serviceWorker from "./serviceWorker";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        {/* <Routes /> */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
