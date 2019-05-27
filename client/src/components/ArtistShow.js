import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { FETCH_ARTIST, FETCH_USER_LIBRARY } from "../graphql/queries";
import { ADD_USER_ARTIST, REMOVE_USER_ARTIST } from "../graphql/mutations";
import "./ArtistShow.css";
import { Link } from "react-router-dom";
const jwt = require("jsonwebtoken");

const playIcon = require("../resources/play_icon.png");
const pauseIcon = require("../resources/pause_icon.png");
const musicNoteIcon = require("../resources/music_note_icon.png");

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

  toggleSong(e, track, iconElementId) {
    this.props.newPlayQueue(this.songList);
    track = track || 0;
    iconElementId = iconElementId || this.defaultTrack;

    let element = document.getElementById(iconElementId);
    let playButton = document.getElementById("playButton");
    // let albumImage = document.getElementById("albumImage");

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
    //this.props.togglePlay();
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
                <p className="artist-artist-name">{data.artist.name}</p>
              </li>
            );
          });
          this.albumSongLists = albumSongLists;

          // artist's background image for header
          let headerStyle = {
            backgroundImage: ` linear-gradient(to bottom, rgba(0, 0, 0, 0), black 70%),url(${
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
                    <button id="playButton" className="artist-play">
                      {" "}
                      PLAY
                    </button>
                    {favoriteButton(data.artist)}
                    <img
                      className="menu-icon"
                      src={require("../resources/menu_icon.png")}
                      alt=""
                    />
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

{
  /* <div className="more-info">
  <p>(YEAR)    {`${data.album.songs.length} SONGS`}</p>
</div> */
}
