import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "../../App";
import Home from "../../pages/home/home";
import About from "../../pages/about/about";
import Book from "../../pages/book/book";

export default () => (
  <>
    <App />
    <Switch>
      <Route exact path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/books"} component={Book} />
    </Switch>
  </>
  //   <Route path="/" component={App}>
  //     <Route component={Home} />
  //     <Route path={"/about"} component={About} />
  //     <Route path={"/books"} component={Book} />
  //   </Route>
);
