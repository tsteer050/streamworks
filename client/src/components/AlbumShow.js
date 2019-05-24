import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUM, FETCH_USER_LIBRARY } from "../graphql/queries";
import "./AlbumShow.css";
import { Link } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Modal from "./Modal";


const playIcon = require('../resources/play_icon.png');
const pauseIcon = require('../resources/pause_icon.png');
const musicNoteIcon = require('../resources/music_note_icon.png');

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentTrack: null,
      currentIconId: null,
    };
    this.isLoggedIn = null;
    this.defaultTrack = null;
    this.songList = null;
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
    let playButton = document.getElementById("playButton");
    let albumImage = document.getElementById("albumImage");

    if (track === this.state.currentTrack) {
      if (this.props.state.playing === false) {
        element.src = pauseIcon;
        playButton.innerHTML = "PLAY";
        //albumImage
        this.props.togglePlay();
      } else {
        element.src = playIcon;
        playButton.innerHTML = "PAUSE";
        this.props.togglePlay();
      }
    } else {
      this.props.newPlayQueue(this.songList);
      element.src = pauseIcon;
      playButton.innerHTML = "PLAY";
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
    const id = this.props.match.params.id;

    // const userId = this.state.user;
    

    return ( 
      
      <Query query={FETCH_ALBUM} variables={{ id }}>
        {({ loading, error, data, client }) => {
          
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const songList = data.album.songs.map(song => {
            return {
              streamUrl: song.audio_url,
              trackTitle: song.title,
              artistName: data.album.artist.name,
              albumArtUrl: data.album.album_art_url
            };
          });
          this.songList = songList;
          // this.props.newPlayQueue(songList)

          //create array of album's songs
          const songs = data.album.songs.map((song, idx) => {
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
                  <span id="1"> {song.title}</span>
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
            <div className="album-show">
              <div className="left-column">
                <div className="album-photo-container">
                  <img
                    id="albumImage"
                    className="album-photo"
                    src={`${data.album.album_art_url}`}
                    alt=""
                    onClick={e =>
                      this.toggleSong(
                        e,
                        this.state.currentTrack,
                        this.state.currentIconId
                      )
                    }
                  />
                </div>
                <p className="album-name">{data.album.title}</p>
                <Link to={`/artist/${data.album.artist._id}`}>
                  <p className="album-artist-name">{data.album.artist.name}</p>
                </Link>
                <button
                  id="playButton"
                  className="play"
                  onClick={e =>
                    this.toggleSong(
                      e,
                      this.state.currentTrack,
                      this.state.currentIconId
                    )
                  }
                >
                  PLAY
                </button>
                <div className="more-info">
                  <p>{`${data.album.songs.length} SONGS`}</p>
                </div>

                <div className="more-buttons">
                  <img
                    className="favorite"
                    src={require("../resources/favorites_icon.png")}
                    alt=""
                  />
                  <img
                    className="menu-icon"
                    src={require("../resources/menu_icon.png")}
                    alt=""
                  />
                </div>
              </div>

              <div className="right-column">
                <ul className="songs-list">{songs}</ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AlbumShow;
