import React, { Fragment } from "react";

import { Switch, Route } from 'react-router-dom';
import Splash from './Splash';
import SideBar from "../components/Sidebar";
import AudioPlayer from "./AudioPlayer";
import AlbumShow from "./AlbumShow";
import ArtistShow from "./ArtistShow";
import PlaylistShow from "./PlaylistShow";
import withRedux from '../util/redux_container';
import Library from './Library';

import SearchBar from "./searchbar/SearchBar";

const AudioPlayerRedux = withRedux(AudioPlayer);
const AlbumShowRedux = withRedux(AlbumShow);
const ArtistShowRedux = withRedux(ArtistShow);
const PlaylistShowRedux = withRedux(PlaylistShow);
const SplashRedux = withRedux(Splash);

class Main extends React.Component {
  render() {
    return (
      <Fragment>
        <SideBar />
        <Switch>
          <Route exact path="/search" component={SearchBar} />
          <Route exact path="/" component={SplashRedux} />
          <Route exact path="/album/:id" component={AlbumShowRedux} />
          <Route exact path="/artist/:id" component={ArtistShowRedux} />
          <Route path="/library" component={Library} />
          <Route path="/playlists/:id" component={PlaylistShowRedux} />
        </Switch>
        <AudioPlayerRedux />
      </Fragment>
    );
  }
}

export default Main;
