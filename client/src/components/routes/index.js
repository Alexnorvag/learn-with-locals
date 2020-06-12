import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../pages/home/home";
import About from "../../pages/about/about";
import Book from "../../pages/book/book";

export default () => (
  <Switch>
    <Route exact path={"/"} component={Home} />
    <Route path={"/about"} component={About} />
    <Route path={"/books"} component={Book} />
  </Switch>
);
