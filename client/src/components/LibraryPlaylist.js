import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibraryPlaylists.css";
import { Link } from "react-router-dom";
const jwt = require("jsonwebtoken");
const imagePlayIcon = require('../resources/album_play_icon.png');
const imagePauseIcon = require('../resources/album_pause_icon.png');

class LibraryPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentPlaylist: null,
      previousPlaylist: null,
      currentIconId: null,
      playIcon: null,
      user: null
    };
    this.playListSongLists = {};
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  componentDidUpdate() {
    if (!document.getElementById(this.state.currentPlaylist)) return;

    if(this.state.previousPlaylist) document.getElementById(this.state.previousPlaylist).src = imagePlayIcon;

    let playlistImageIcon = document.getElementById(this.state.currentPlaylist);
    if (this.props.state.playing === false) {
      playlistImageIcon.src = imagePlayIcon;
    } else {
      playlistImageIcon.src = imagePauseIcon;
    }
  }

  onHover(elementId) {
    let playlistIcon = document.getElementById(elementId);
    playlistIcon.style.visibility = "visible";
  }

  offHover(elementId) {
    let playlistIcon = document.getElementById(elementId);
    playlistIcon.style.visibility = "hidden";
  }

  
  playPlaylist(e, playlistId) {
    if (this.state.currentPlaylist === playlistId) {
      this.props.togglePlay();
    } else {
      this.setState({ previousPlaylist: this.state.currentPlaylist });
      this.setState({ currentPlaylist: playlistId });

      let playQueue = this.playListSongLists[playlistId];
      this.props.newPlayQueue(playQueue);
      this.props.selectTrack(0);
      if(!this.props.state.playing) this.props.togglePlay();
      
    }
  }

  render() {
    if (!this.state.user) return <div />;

    return (
      <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user.id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="library-loading">
                <div className="lds-facebook">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            );
          if (error) return `Error! ${error.message}`;

          //render simple message if nothing in library
          if (!data.user.playlists.length) {
            return (
              <div className="no-playlists">Your Playlists will go here</div>
            );
          }

          //create array of album's songs
          const playLists = data.user.playlists.map((playList, idx) => {
            this.playListSongLists[playList._id] = playList.songs.map(song => {
              return {
                stream_url: song.audio_url,
                trackTitle: song.title,
                artistName: song.album.artist.name,
                albumArtUrl: song.album.album_art_url
              };
            });

            let image;
            if (playList.songs.length > 0) {
              image = playList.songs[0].album.album_art_url;
            } else {
              image = require("../images/empty-playlist.png");
            }

            var sectionStyle = {
              width: "100%",
              height: "100%",
              backgroundImage: `url(${image})`,
              backgroundSize: "145px"
            };

            return (
              <li key={playList._id} className="playlist-image-container">
                <div
                  className="playlist-image"
                  style={sectionStyle}
                  onClick={e => {
                    if(e.target.className === "playlist-play-icon") return;
                    this.props.history.push(`/playlists/${playList._id}`);
                  }}
                  onMouseOver={() => this.onHover(playList._id, idx)}
                  onMouseOut={() => {
                    this.offHover(playList._id, idx);
                  }}
                >
                  <div className="overlay-playlists">
                    <img
                      id={playList._id}
                      className="playlist-play-icon"
                      onClick={e => this.playPlaylist(e, playList._id)}
                      src={imagePlayIcon}
                      alt=""
                    />
                  </div>
                </div>
                <Link
                  className="library-playlist-link"
                  to={`/playlists/${playList._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="library-playlist-name">{playList.title}</p>
                  <p className="library-playlist-length">{playList.songs.length ? playList.songs.length + " songs" : "0 songs"}</p>
                </Link>
              </li>
            );
          });

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
