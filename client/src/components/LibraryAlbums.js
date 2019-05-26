import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibraryAlbums.css";
import { Link } from "react-router-dom";
const jwt = require("jsonwebtoken");

const playIcon = require("../resources/play_icon.png");
const pauseIcon = require("../resources/pause_icon.png");
const musicNoteIcon = require("../resources/music_note_icon.png");

class LibraryAlbums extends React.Component {
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
      <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user.id }}>
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
          if (!data.user.albums.length) {
            return (
              <div className="no-albums">Your albums will go here</div>
            )
          }

          //create array of album's songs
          const albums = data.user.albums.map((album, idx) => {
            albumSongLists[album._id] = album.songs.map(song => {
              return {
                streamUrl: song.audio_url,
                trackTitle: song.title,
                artistName: album.artist.name,
                albumArtUrl: album.album_art_url
              };
            });

            let songLength = null;
            var sectionStyle = {
              width: "100%",
              height: "100%",
              backgroundImage: `url(${album.album_art_url})`,
              backgroundSize: "145px"
            };

            return (
              <li key={album._id} className="album-image-container">
                <div
                  className="album-image"
                  style={sectionStyle}
                  onClick={e => this.playAlbum(e, album._id)}
                  onMouseOver={() => this.onHover(album._id, idx)}
                  onMouseOut={() => {
                    this.offHover(album._id, idx);
                  }}
                >
                  <img
                    id={album._id}
                    className="album-play-icon"
                    src=""
                    alt=""
                  />
                </div>
                <Link
                  to={`/album/${album._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="artist-album-name">{album.title}</p>
                </Link>
                <Link
                  to={`/artist/${album.artist._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="artist-artist-name">{album.artist.name}</p>
                </Link>
              </li>
            );
          });
          this.albumSongLists = albumSongLists;

        

          return (
            <div className="library-albums-show">
              <div className="albums-section">
                <ul className="albums-list">{albums}</ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LibraryAlbums;
