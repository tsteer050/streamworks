import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { FETCH_ARTIST, FETCH_USER_LIBRARY } from "../graphql/queries";
import { ADD_USER_ARTIST, REMOVE_USER_ARTIST } from "../graphql/mutations";
import "./ArtistShow.css";
import { Link } from "react-router-dom";
const jwt = require("jsonwebtoken");

const musicNoteIcon = require("../resources/music_note_icon.png");
const imagePlayIcon = require('../resources/album_play_icon.png');
const imagePauseIcon = require('../resources/album_pause_icon.png');

class ArtistShow extends React.Component {
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
    if (!document.getElementById("playButton")) return;
    if (!document.getElementById(this.state.currentAlbum)) return;

    if (this.state.currentTrack !== this.props.state.currentTrack) {
      if (this.state.currentTrack !== null) {
        document.getElementById(this.state.currentAlbum).src = musicNoteIcon;
      }
      this.setState({ currentTrack: this.props.state.currentTrack });
    }

    let playButton = document.getElementById("playButton");
    let albumImageIcon = document.getElementById(this.state.currentAlbum);
    
    if (this.props.state.playing === false) {
      playButton.innerHTML = "PAUSE";
      albumImageIcon.src = imagePlayIcon;
    } else {
      playButton.innerHTML = "PLAY";
      albumImageIcon.src = imagePauseIcon;
    }
  }

  onHover(elementId, track) {
      let albumImage = document.getElementById(elementId);
      albumImage.style.visibility = "visible";
  }

  offHover(elementId, track) {
      let albumImage = document.getElementById(elementId);
      albumImage.style.visibility = "hidden";
      return;
  }

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

  showAlbumPage(e, album_id) {
    if (e.target.className === "album-play-icon") return;
    this.props.history.push(`/album/${ album_id }`);
  }

  render() {
    const id = this.props.match.params.id;


    const favoriteIcon = (addUserArtist, removeUserArtist, artistInLibrary) => {
      if (artistInLibrary) {
        return (
          <img onClick={e => removeUserArtist({ variables: { userId: this.state.user.id, artistId: id } })} className="favorite" src={require('../resources/favorite_filled.png')} alt="Remove from library" />
        )
      }
      return (
        <img onClick={e => addUserArtist({ variables: { userId: this.state.user.id, artistId: id } })} className="favorite" src={require('../resources/favorite_outline.png')} alt="Add to library" />
      )
    };



    let favoriteButton;
    if (this.state.user) {
      favoriteButton = (artist) => {
        return (
          <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user.id }}>
            {({ loading, error, data, client }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              let artistInLibrary;
              data.user.artists.some((userArtist) => userArtist._id === artist._id) ? artistInLibrary = true : artistInLibrary = false;
              return (
                <Mutation
                  mutation={ADD_USER_ARTIST}
                >
                  {addUserArtist => {
                    return (
                      <Mutation
                        mutation={REMOVE_USER_ARTIST}
                      >
                        {removeUserArtist => {
                          return (
                            <Fragment>
                              {favoriteIcon(addUserArtist, removeUserArtist, artistInLibrary)}
                            </Fragment>
                          )
                        }}
                      </Mutation>
                    )
                  }}
                </Mutation>
              )
            }}
          </Query>
        )
      }
    } else {
      favoriteButton = () => {
        return (
          <img className="favorite" src={require('../resources/favorite_outline.png')} alt="" />
        )
      }
    }



//     BELOW HERE IS THE PAGE









    
    return (
      <Query query={FETCH_ARTIST} variables={{ id }}>
        {({ loading, error, data }) => {
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
          let albumSongLists = {};

          //create array of album's songs
          const albums = data.artist.albums.map((album, idx) => {
            albumSongLists[album._id] = album.songs.map(song => {
              return {
                stream_url: song.audio_url,
                trackTitle: song.title,
                artistName: data.artist.name,
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
                  onClick={e => this.showAlbumPage(e, album._id)}
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
                        onClick={e => this.playAlbum(e, album._id)}
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
                <p className="artist-artist-name">{data.artist.name}</p>
              </li>
            );
          });
          this.albumSongLists = albumSongLists;

          // artist's background image for header
          let headerStyle = {
            backgroundImage: ` linear-gradient(to bottom, rgba(0, 0, 0, 0), black 80%),url(${
              data.artist.artist_image_url
            })`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat"
          };

          return (
            <div className="artist-show">
              <div className="title-header" style={headerStyle}>
                <div className="artist-name-div">
                  <p className="artist-name">{data.artist.name}</p>
                  <div className="header-buttons">
                    <button id="playButton" className="artist-play"
                      onClick={e => this.playAlbum(e, this.state.currentAlbum || data.artist.albums[0]._id)}>
                      {" "}
                      PLAY
                    </button>
                    {favoriteButton(data.artist)}
                    {/* <img
                      className="menu-icon"
                      src={require("../resources/menu_icon.png")}
                      alt=""
                    /> */}
                  </div>
                </div>

                <div className="albums-section">
                  <h2 className="albums-header">Albums</h2>
                  <ul className="albums-list">{albums}</ul>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ArtistShow;

