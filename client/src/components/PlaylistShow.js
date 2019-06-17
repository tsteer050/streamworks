import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { FETCH_PLAYLIST } from "../graphql/queries";
import "./PlaylistShow.css";
import { Link } from "react-router-dom";
import "rodal/lib/rodal.css";


import SongIndex from './index/SongIndex';

const jwt = require("jsonwebtoken");
const playIcon = require('../resources/play_icon.png');
const pauseIcon = require('../resources/pause_icon.png');
const imagePlayIcon = require('../resources/album_play_icon.png');
const imagePauseIcon = require('../resources/album_pause_icon.png');
const musicNoteIcon = require('../resources/music_note_icon.png');

class PlaylistShow extends React.Component {
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
    this.currentImageIconId = null;

    this.setDefaultTrack = this.setDefaultTrack.bind(this);
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
    this.toggleSong = this.toggleSong.bind(this);

  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
    //this.props.newPlayQueue(this.songList);
  }

  componentDidUpdate() {
    if (!document.getElementById("playButton")) return;
    if (!document.getElementById(this.props.state.currentTrack)) return;

    if (this.state.currentTrack !== this.props.state.currentTrack) {
      if (this.state.currentTrack !== null) {
        document.getElementById(this.state.currentTrack).src = musicNoteIcon;
      }
      this.setState({ currentTrack: this.props.state.currentTrack });
    }

    let icon = document.getElementById(this.props.state.currentTrack);
    let playButton = document.getElementById("playButton");
    let albumImageIcon = document.getElementById("albumImage");

    if (this.props.state.playing === false) {
      playButton.innerHTML = "PAUSE";
      icon.src = playIcon;
      albumImageIcon.src = imagePlayIcon;
    } else {
      playButton.innerHTML = "PLAY";
      icon.src = pauseIcon;
      albumImageIcon.src = imagePauseIcon;
    }
  }

  setDefaultTrack(iconId) {
    this.defaultTrack = iconId;
  }

  // toggleImageIcon() {
  //   let icon = document.getElementById("albumImage");


  //   if (this.props.state.playing === false) {
  //     icon.src = imagePauseIcon;
  //   } else {
  //     icon.src = imagePlayIcon;
  //   }
  // }

  onHover(elementId, track) {

    if (elementId === "playlistImage") {
      let playlistImage = document.getElementById(elementId);
      playlistImage.style.visibility = "visible";
      return;
    }
    let element = document.getElementById(track);

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

    if (elementId === "playlistImage") {
      let playlistImage = document.getElementById(elementId);
      playlistImage.style.visibility = "hidden";
      return;
    }
    if (this.state.currentTrack !== track) {
      let element = document.getElementById(track);
      element.src = require("../resources/music_note_icon.png");
    }
  }

  toggleSong(e, track, iconElementId) {
    track = track || 0;
    iconElementId = iconElementId || this.defaultTrack;

    if (track === this.state.currentTrack) {
      this.props.togglePlay();
    } else {
      this.props.newPlayQueue(this.songList);
      this.props.selectTrack(track);

      if (this.props.state.playing === false) {
        this.props.togglePlay();
      } else {
        this.props.togglePlay();
        this.props.togglePlay();
      }
    }
  }

  render() {
    const id = this.props.match.params.id;

    let favoriteButton;
    
    return (
      <Query query={FETCH_PLAYLIST} variables={{ id }}>
        {({ loading, error, data, client }) => {
          if (loading) {
            return (
              <div className="library-loading artist-loading-screen">
                <div class="lds-facebook">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            );
          }
          if (error) return `Error! ${error.message}`;

          const songList = data.playlist.songs.map(song => {
            return {
              stream_url: song.audio_url,
              trackTitle: song.title,
              artistName: song.artist.name,
              albumArtUrl: song.album.albumArtUrl

            };
          });
          let image;
          if (data.playlist.songs.length > 0) {
            image = data.playlist.songs[0].album.albumArtUrl;
          } else {
            image = require('../images/empty-playlist.png');
          }

          this.songList = songList;
          const songIndex = <SongIndex songs={data.playlist.songs} setDefaultTrack={this.setDefaultTrack} onHover={this.onHover} offHover={this.offHover} toggleSong={this.toggleSong} />;
          const playlistArtStyle = {
            width: '225px',
            height: '225px',
            backgroundImage: `url(${image})`,
            backgroundSize: "225px"
          }
          debugger
          return (
            <div className="playlist-show">
              <div className="left-column">
                <div className="playlist-photo-container" style={playlistArtStyle}
                  onClick={e =>
                    this.toggleSong(
                      e,
                      this.state.currentTrack,
                      this.state.currentIconId
                    )
                  }
                  onMouseOver={() => this.onHover("playlistImage")}
                  onMouseOut={() => this.offHover("playlistImage")}
                >
                  <div className="playlist-show-overlay">
                    <img
                      id="playlistImage"
                      className="playlist-show-play-icon"
                      alt=""
                      src={imagePlayIcon}
                    />
                  </div>
                </div>
                <p className="playlist-name">{data.playlist.title}</p>
                {/* <Link to={`/library/playlists`}>
                  <p className="playlist-artist-name">{this.state.user.name}</p>
                </Link> */}
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
                  <p>{`${data.playlist.songs.length} SONGS`}</p>
                </div>
    
              </div>
              <div className="right-column">
                {songIndex}

              </div>
            </div>
          );
        }}
    </Query>)
    }
  
  }

export default PlaylistShow
