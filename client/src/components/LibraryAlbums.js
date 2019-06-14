import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibraryAlbums.css";
import { Link } from "react-router-dom";
const jwt = require("jsonwebtoken");

const imagePlayIcon = require('../resources/album_play_icon.png');
const imagePauseIcon = require('../resources/album_pause_icon.png');

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

  componentDidUpdate() {
    if (!document.getElementById(this.state.currentAlbum)) return;

    if (this.state.currentTrack !== this.props.state.currentTrack) {
      this.setState({ currentTrack: this.props.state.currentTrack });
    }

    let albumImageIcon = document.getElementById(this.state.currentAlbum);

    if (this.props.state.playing === false) {
      albumImageIcon.src = imagePlayIcon;
    } else {
      albumImageIcon.src = imagePauseIcon;
    }
  }

  onHover(elementId) {
    let albumImage = document.getElementById(elementId);
    albumImage.style.visibility = "visible";
  }

  offHover(elementId) {
    let albumImage = document.getElementById(elementId);
    albumImage.style.visibility = "hidden";
    return;
  }


  // toggleIcon(iconId) {
  //   if (this.props.state.playing === false) {
  //     this.setState({
  //       playIcon: require("../resources/album_pause_icon.png")
  //     });
  //   } else {
  //     this.setState({
  //       playIcon: require("../resources/album_play_icon.png")
  //     });
  //   }
  //   let icon = document.getElementById(iconId);
  //   icon.src = this.state.playIcon;
  // }

  playAlbum(e, albumId) {
    if (this.state.currentAlbum === albumId) {
      this.props.togglePlay();
    } else {
      this.setState({
        currentAlbum: albumId
      });
      let playQueue = this.albumSongLists[albumId];
      this.props.newPlayQueue(playQueue);
      this.props.selectTrack(0);
      this.props.togglePlay();
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
                stream_url: song.audio_url,
                trackTitle: song.title,
                artistName: album.artist.name,
                albumArtUrl: album.album_art_url
              };
            });

         
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
                <div className="overlay">
                  <img
                    id={album._id}
                    className="album-play-icon"
                    src={imagePlayIcon}
                    alt=""
                  />
                  </div>
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
