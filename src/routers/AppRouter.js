import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "./../pages/LoginPage";
import SingUpPage from "./../pages/SingUpPage";
import HomePage from "./../pages/HomePage";

const history = createBrowserHistory();

const AppRouter = () => (
  <BrowserRouter history={history}>
    <div>
      <Switch>
        <PrivateRoute path="/" component={HomePage} exact />
        <PublicRoute path="/login" component={LoginPage} exact />
        <PublicRoute path="/signup" component={SingUpPage} exact />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
