import React from "react";
import './library.css';
import { Switch, Link, Route } from 'react-router-dom';
import LibraryAlbums from './LibraryAlbums';
import LibraryPlaylist from './LibraryPlaylist';
import LibrarySongs from './LibrarySongs';
import LibraryArtists from './LibraryArtists';
import NewPlaylistModal from "./NewPlaylistModal";
import withRedux from '../util/redux_container';

const LibraryAlbumsRedux = withRedux(LibraryAlbums);
const LibraryPlaylistRedux = withRedux(LibraryPlaylist);
const LibrarySongsRedux = withRedux(LibrarySongs);
const LibraryArtistsRedux = withRedux(LibraryArtists);

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.history.push("/library/playlists");
  }

  toggleModal() {
    let modal = document.getElementById("new-playlist-modal");
    modal.classList.toggle("visible");
  }

  render() {
    return (
      <div className="library-page-area">
        <div className="library-nav-bar">
          <Link to="/library/playlists">
            Playlists
        </Link>
          <Link to="/library/songs">
            Songs
        </Link>
          <Link to="/library/albums">
            Albums
        </Link>
          <Link to="/library/artists">
            Artists
        </Link>
        </div>
        <button className="new-playlist-button" onClick={this.toggleModal}>
          NEW PLAYLIST
        </button>
        <div id="new-playlist-modal" className="modal">
          <NewPlaylistModal toggleModal={this.toggleModal}/>
        </div>
        <Switch>
          <Route exact path="/library/playlists" component={LibraryPlaylistRedux} />
          <Route exact path="/library/songs" component={LibrarySongsRedux} />
          <Route exact path="/library/albums" component={LibraryAlbumsRedux} />
          <Route exact path="/library/artists" component={LibraryArtistsRedux} />
        </Switch>
      </div>
    )};
     
};



export default Library;

