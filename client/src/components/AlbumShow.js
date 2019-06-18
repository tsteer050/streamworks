import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { FETCH_ALBUM, FETCH_USER_LIBRARY } from "../graphql/queries";
import { ADD_USER_ALBUM, REMOVE_USER_ALBUM } from "../graphql/mutations";
import "./AlbumShow.css";
import { Link } from "react-router-dom";
import "rodal/lib/rodal.css";

import SongIndex from "./index/SongIndex";

const jwt = require("jsonwebtoken");
const playIcon = require("../resources/play_icon.png");
const pauseIcon = require("../resources/pause_icon.png");
const imagePlayIcon = require("../resources/album_play_icon.png");
const imagePauseIcon = require("../resources/album_pause_icon.png");
const musicNoteIcon = require("../resources/music_note_icon.png");

class AlbumShow extends React.Component {
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
      playButton.innerHTML = "PLAY";
      icon.src = playIcon;
      albumImageIcon.src = imagePlayIcon;
    } else {
      playButton.innerHTML = "PAUSE";
      icon.src = pauseIcon;
      albumImageIcon.src = imagePauseIcon;
    }
  }

  setDefaultTrack(iconId) {
    this.defaultTrack = iconId;
  }

  onHover(elementId, track) {
    if (elementId === "albumImage") {
      let albumImage = document.getElementById(elementId);
      albumImage.style.visibility = "visible";
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
    if (elementId === "albumImage") {
      let albumImage = document.getElementById(elementId);
      albumImage.style.visibility = "hidden";
      return;
    }
    if (this.state.currentTrack !== track) {
      let element = document.getElementById(track);
      element.src = require("../resources/music_note_icon.png");
    }
  }

  toggleSong(e, track, iconElementId) {
    track = track || 0;

    if (typeof iconElementId === "Object") {
      iconElementId = iconElementId._id || this.defaultTrack;
    } else {
      iconElementId = iconElementId || this.defaultTrack;
    }

    if (track === this.state.currentTrack) {
      this.props.togglePlay();
    } else {
      this.props.newPlayQueue(this.songList);
      this.props.selectTrack(track);

      if (this.props.state.playing === false) {
        this.props.togglePlay();
      } else {
        this.props.togglePlay();
      }
    }
  }

  render() {
    const id = this.props.match.params.id;

    const favoriteIcon = (addUserAlbum, removeUserAlbum, albumInLibrary) => {
      if (albumInLibrary) {
        return (
          <img
            onClick={e =>
              removeUserAlbum({
                variables: { userId: this.state.user.id, albumId: id }
              })
            }
            className="favorite"
            src={require("../resources/favorite_filled.png")}
            alt="Remove from library"
          />
        );
      }
      return (
        <img
          onClick={e =>
            addUserAlbum({
              variables: { userId: this.state.user.id, albumId: id }
            })
          }
          className="favorite"
          src={require("../resources/favorite_outline.png")}
          alt="Add to library"
        />
      );
    };

    let favoriteButton;
    if (this.state.user) {
      favoriteButton = album => {
        return (
          <Query
            query={FETCH_USER_LIBRARY}
            variables={{ id: this.state.user.id }}
            partialRefetch={true}
          >
            {({ loading, error, data, client }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              let albumInLibrary;
              data.user.albums.some(userAlbum => userAlbum._id === album._id)
                ? (albumInLibrary = true)
                : (albumInLibrary = false);
              return (
                <Mutation mutation={ADD_USER_ALBUM}>
                  {addUserAlbum => {
                    return (
                      <Mutation mutation={REMOVE_USER_ALBUM}>
                        {removeUserAlbum => {
                          return (
                            <Fragment>
                              {favoriteIcon(
                                addUserAlbum,
                                removeUserAlbum,
                                albumInLibrary
                              )}
                            </Fragment>
                          );
                        }}
                      </Mutation>
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
        );
      };
    } else {
      favoriteButton = () => {
        return (
          <img
            className="favorite"
            src={require("../resources/favorite_outline.png")}
            alt=""
          />
        );
      };
    }

    return (
      <Query query={FETCH_ALBUM} variables={{ id }}>
        {({ loading, error, data, client }) => {
          if (loading)
            return (
              <div className="library-loading artist-loading-screen">
                <div class="lds-facebook">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            );

          if (error) return `Error! ${error.message}`;

          const songList = data.album.songs.map(song => {
            return {
              stream_url: song.audio_url,
              trackTitle: song.title,
              artistName: data.album.artist.name,
              albumArtUrl: data.album.album_art_url
            };
          });
          this.songList = songList;

          const songIndex = (
            <SongIndex
              songs={data.album.songs}
              setDefaultTrack={this.setDefaultTrack}
              onHover={this.onHover}
              offHover={this.offHover}
              toggleSong={this.toggleSong}
            />
          );
          const albumArtStyle = {
            width: "225px",
            height: "225px",
            backgroundImage: `url(${data.album.album_art_url})`,
            backgroundSize: "225px"
          };
          return (
            <div className="album-show">
              <div className="left-column">
                <div
                  className="album-photo-container"
                  style={albumArtStyle}
                  onClick={e =>
                    this.toggleSong(
                      e,
                      this.state.currentTrack,
                      this.state.currentIconId
                    )
                  }
                  onMouseOver={() => this.onHover("albumImage")}
                  onMouseOut={() => this.offHover("albumImage")}
                >
                  <div className="album-show-overlay">
                    <img
                      id="albumImage"
                      className="album-show-play-icon"
                      alt=""
                      src={imagePlayIcon}
                    />
                  </div>
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
                  {favoriteButton(data.album)}
                  {/* <img className="menu-icon" src={require('../resources/menu_icon.png')} alt=""/> */}
                </div>
              </div>
              <div className="right-column">{songIndex}</div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AlbumShow;
