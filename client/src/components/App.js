import React from 'react';
import Splash from './Splash';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from '../util/route_util';
import Login from './Login';
import Signup from './Signup';
import Sidebar from './Sidebar';
import AudioPlayer from './AudioPlayer';
import AlbumShow from './AlbumShow';
import './root.css';

const App = () => {
  return (
    <div id="root-container">
      <Route path="/" component={Sidebar} />
      <Switch>
        <Route exact path="/"  component={Splash} />
        <AuthRoute exact path="/login" component={Login} routeType="auth"/>
        <AuthRoute exact path="/signup" component={Signup} routeType="auth"/>
        <Route exact path="/album/:id" component={AlbumShow} />
      </Switch>
      {/* <Route path="/" component={AudioPlayer} /> */}
    </div>
  );
};

export default App;
