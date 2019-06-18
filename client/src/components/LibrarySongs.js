import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibrarySongs.css";
import SongIndex from "./index/SongIndex";
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

    this.setDefaultTrack = this.setDefaultTrack.bind(this);
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
    this.toggleSong = this.toggleSong.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  componentDidUpdate() {
    if (!document.getElementById(this.props.state.currentTrack)) return;

    if (this.state.currentTrack !== this.props.state.currentTrack) {
      if (this.state.currentTrack !== null) {
        document.getElementById(this.state.currentTrack).src = musicNoteIcon;
      }
      this.setState({ currentTrack: this.props.state.currentTrack });
    }

    let icon = document.getElementById(this.props.state.currentTrack);

    if (this.props.state.playing === false) {
      icon.src = playIcon;
    } else {
      icon.src = pauseIcon;
    }
  }

  setDefaultTrack(iconId) {
    this.defaultTrack = iconId;
  }

  onHover(elementId, track) {
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
    if (this.state.currentTrack !== track) {
      let element = document.getElementById(track);
      element.src = require("../resources/music_note_icon.png");
    }
  }

  toggleSong(e, track, iconElementId) {
    track = track || 0;
    iconElementId = iconElementId._id || this.defaultTrack;

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

          if (!data.user.songs.length) {
            return <div className="no-songs">Your songs will appear here</div>;
          }
          const songList = data.user.songs.map(song => {
            return {
              stream_url: song.audio_url,
              trackTitle: song.title,
              artistName: song.album.artist.name,
              albumArtUrl: song.album.album_art_url
            };
          });
          this.songList = songList;

          //create array of album's songs
          const songs = (
            <SongIndex
              songs={data.user.songs}
              setDefaultTrack={this.setDefaultTrack}
              onHover={this.onHover}
              offHover={this.offHover}
              toggleSong={this.toggleSong}
            />
          );

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
