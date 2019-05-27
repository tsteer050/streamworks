import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibraryPlaylists.css";
import { Link } from "react-router-dom";
const jwt = require("jsonwebtoken");

class LibraryPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentAlbum: null,
      currentIconId: null,
      playIcon: null,
      user: null
    };
    this.albumSongLists = null;
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  onHover(elementId) {
    let playIcon = document.getElementById(elementId);

    if (elementId === this.state.currentAlbum) {
      playIcon.src = this.state.playIcon;
    } else {
      playIcon.src = require("../resources/album_play_icon.png");
    }
  }

  offHover(elementId) {
    let element = document.getElementById(elementId);
    element.src = "";
  }
  toggleIcon(iconId) {
    if (this.props.state.playing === false) {
      this.state.playIcon = require("../resources/album_pause_icon.png");
    } else {
      this.state.playIcon = require("../resources/album_play_icon.png");
    }
    let icon = document.getElementById(iconId);
    icon.src = this.state.playIcon;
  }

  playAlbum(e, albumId) {
    if (this.state.currentAlbum === albumId) {
      this.props.togglePlay();
      this.toggleIcon(albumId);
    } else {
      this.state.currentAlbum = albumId;
      let playQueue = this.albumSongLists[albumId];
      this.props.newPlayQueue(playQueue);
      this.props.selectTrack(0);
      this.props.togglePlay();
      this.toggleIcon(albumId);
    }
  }

  render() {
    if (!this.state.user) return (<div></div>);

    return (
      <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user.id }} >
        {({ loading, error, data }) => {

          if (loading)
            return (
              <div className="library-loading">
                <div class="lds-facebook">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            );
          if (error) return `Error! ${error.message}`;
          let albumSongLists = {};

          //render simple message if nothing in library
          if (!data.user.playlists.length) {
            return (
              <div className="no-playlists">Your Playlists will go here</div>
            )
          }
          let playListSongLists = [];
          //create array of album's songs
          const playLists = data.user.playlists.map((playList, idx) => {

            playListSongLists[playList._id] = playList.songs.map(song => {
              return {
                stream_url: song.audio_url,
                trackTitle: song.title,
                artistName: song.artist.name,
                albumArtUrl: song.album.album_art_url
              };
            });

            let songLength = null;
            var sectionStyle = {
              width: "100%",
              height: "100%",
              backgroundImage: `url(${playList.playlist_art_url})`,
              backgroundSize: "145px"
            };

            return (
              <li key={playList._id} className="playlist-image-container">
                <div
                  className="playlist-image"
                  style={sectionStyle}
                  onClick={e => this.playPlaylist(e, playList._id)}
                  onMouseOver={() => this.onHover(playList._id, idx)}
                  onMouseOut={() => {
                    this.offHover(playList._id, idx);
                  }}
                >
                  <img
                    id={playList._id}
                    className="playlist-play-icon"
                    src=""
                    alt=""
                  />
                </div>
                <Link
                  to={`/playlists/${playList._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="playlist-name">{playList.title}</p>
                </Link>
              </li>
            );
          });
          this.playListSongLists = playListSongLists;



          return (
            <div className="library-albums-show">
              <div className="albums-section">
                <ul className="albums-list">{playLists}</ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LibraryPlaylist;
