import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "../components/profile/Profile";
import Main from "./Main";
import Contact from "./profile/Contact";

import "./root.css";

const App = () => {
  return (
    <div id="root-container">
      <Switch>
        <AuthRoute exact path="/account" component={Profile} />
        <AuthRoute exact path="/contact" component={Contact} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
