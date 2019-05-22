import React, { Fragment } from "react";
import { Switch, Route } from 'react-router-dom';
import Splash from './Splash';
import SideBar from "../components/Sidebar";
import AudioPlayer from "./AudioPlayer";
import AlbumShow from "./AlbumShow";

class Splash extends React.Component {
  render() {
    return (
      <Fragment>
        <SideBar />
          <Switch>
            <Route exact path="/" component={Splash} />
            <Route exact path="/album/:id" component={AlbumShow} />
          </Switch>
        <AudioPlayer />
      </Fragment>
    );
  }
}

export default Splash;
