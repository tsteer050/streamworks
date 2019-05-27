import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { FETCH_ALBUM, FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibrarySongs.css";
const jwt = require("jsonwebtoken");

const playIcon = require("../resources/play_icon.png");
const pauseIcon = require("../resources/pause_icon.png");
const musicNoteIcon = require("../resources/music_note_icon.png");

class LibrarySongs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentTrack: null,
      currentIconId: null,
      user: null
    };
    this.isLoggedIn = null;
    this.defaultTrack = null;
    this.songList = null;
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  onHover(elementId, track) {
    if (elementId === "albumImage") {
      let albumImage = document.getElementById(elementId);
    }
    let element = document.getElementById(elementId);

    if (
      this.props.state.playing === true &&
      this.state.currentTrack === track
    ) {
      element.src = pauseIcon;
    } else {
      element.src = playIcon;
    }
  }
  offHover(elementId, track) {
    let element = document.getElementById(elementId);
    if (this.state.currentTrack !== track) {
      element.src = require("../resources/music_note_icon.png");
    }
  }

  toggleSong(e, track, iconElementId) {
    track = track || 0;
    iconElementId = iconElementId || this.defaultTrack;

    let element = document.getElementById(iconElementId);
    let albumImage = document.getElementById("albumImage");

    if (track === this.state.currentTrack) {
      if (this.props.state.playing === false) {
        element.src = pauseIcon;
        //albumImage
        this.props.togglePlay();
      } else {
        element.src = playIcon;
        this.props.togglePlay();
      }
    } else {
      this.props.newPlayQueue(this.songList);
      element.src = pauseIcon;
      this.setState({ currentTrack: track });

      // set previous track's icon back to music note
      if (this.state.currentIconId)
        document.getElementById(this.state.currentIconId).src = musicNoteIcon;

      this.setState({ currentIconId: iconElementId });
      this.props.selectTrack(track);
      this.props.togglePlay();
    }
  }

  render() {
    if(!this.state.user) return (<div></div>);

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
            
          if(!data.user.songs.length) {
            return (<div className="no-songs">Your songs will appear here</div>)
          }
          const songList = data.user.songs.map(song => {
            return {
              stream_url: song.audio_url,
              trackTitle: song.title,
              artistName: song.artist.name,
              albumArtUrl: song.album.album_art_url
            };
          });
          this.songList = songList;
          // this.props.newPlayQueue(songList)

          //create array of album's songs
          const songs = data.user.songs.map((song, idx) => {
            if (idx === 0) this.defaultTrack = song._id;

            let songLength = null;
            if (song.length % 60 >= 10) {
              songLength = `${Math.floor(
                parseInt(song.length) / 60
              )}:${song.length % 60}`;
            } else {
              songLength = `${Math.floor(
                parseInt(song.length) / 60
              )}:0${song.length % 60}`;
            }
            return (
              <li
                key={song._id}
                onMouseOver={() => {
                  this.onHover(song._id, idx);
                }}
                onMouseOut={() => {
                  this.offHover(song._id, idx);
                }}
              >
                <div className="playicon-songname">
                  <span
                    className="playicon-container"
                    onClick={e => this.toggleSong(e, idx, song._id)}
                  >
                    <img
                      id={song._id}
                      className="playicon"
                      src={require("../resources/music_note_icon.png")}
                      alt=""
                    />
                  </span>
                  <span className="song-info-container">
                    <span id="1"> {song.title}</span>

                    <div className="song-artist-album">
                      <Link to={`/artist/${song.album.artist._id}`}>
                        <span className="song-artist">
                          {song.artist.name}
                        </span>
                      </Link>
                      <span> . </span>
                      <Link to={`/album/${song.album._id}`}>
                        <span className="song-album">{song.album.title}</span>
                      </Link>
                    </div>
                  </span>
                </div>
                <div className="menu-songlength">
                  <span className="menu">
                    <img
                      className="menu-icon"
                      src={require("../resources/menu_icon.png")}
                      alt=""
                    />
                  </span>
                  <span> {songLength}</span>
                </div>
              </li>
            );
          });

          return (
            // <div className="librarysongs-show">

            <div className="main-column">
              <ul className="songs-list">{songs}</ul>
            </div>

            // </div>
          );
        }}
      </Query>
    );
  }
}

export default LibrarySongs;
