import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../util/route_util";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "../components/profile/Profile";
import Main from './Main';
import "./root.css";

const App = () => {
  return (
    <div id="root-container">
      <Switch>
        <AuthRoute exact path="/account" component={Profile} />
        <Route exact path="/" component={Main} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/signup" component={Signup} routeType="auth" />
      </Switch>
    </div>
  );
};

export default App;
