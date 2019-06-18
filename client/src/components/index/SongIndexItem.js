import React, { Fragment } from "react";
import { FETCH_USER_LIBRARY } from "../../graphql/queries";
import { ADD_USER_SONG, REMOVE_USER_SONG } from "../../graphql/mutations";
import { Query, Mutation } from "react-apollo";
import AddToPlaylistModal from "./AddToPlaylistModal";
import "./songIndexItem.css";
const jwt = require("jsonwebtoken");

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      user: null
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  toggleModal(song) {
    let id = song._id + "modal";
    let modal = document.getElementById(id);
    modal.classList.add("visible");
    console.log("toggled modal");
  }

  render() {
    const { song, idx, onHover, offHover, toggleSong, songLength } = this.props;

    //
    const favoriteMenuItem = (addUserSong, removeUserSong, songInLibrary) => {
      if (songInLibrary) {
        return (
          <li className="song-menu-item">
            <p
              onClick={e =>
                removeUserSong({
                  variables: { userId: this.state.user.id, songId: song._id }
                })
              }
            >
              Remove from library
            </p>
          </li>
        );
      }
      return (
        <li className="song-menu-item">
          <p
            onClick={e =>
              addUserSong({
                variables: { userId: this.state.user.id, songId: song._id }
              })
            }
          >
            Add to library
          </p>
        </li>
      );
    };

    let favoriteButton;
    if (this.state.user) {
      favoriteButton = song => {
        return (
          <Query
            query={FETCH_USER_LIBRARY}
            variables={{ id: this.state.user.id }}
          >
            {({ loading, error, data, client }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              let songInLibrary;
              data.user.songs.some(userSong => userSong._id === song._id)
                ? (songInLibrary = true)
                : (songInLibrary = false);
              return (
                <Mutation mutation={ADD_USER_SONG}>
                  {addUserSong => {
                    return (
                      <Mutation mutation={REMOVE_USER_SONG}>
                        {removeUserSong => {
                          return (
                            <Fragment>
                              {favoriteMenuItem(
                                addUserSong,
                                removeUserSong,
                                songInLibrary
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
        return <li className="song-menu-item">Add to library</li>;
      };
    }

    return (
      <li
        key={song._id}
        onMouseOver={() => {
          onHover(song._id, idx);
        }}
        onMouseOut={() => {
          offHover(song._id, idx);
        }}
      >
        <div className="playicon-songname">
          <span
            className="playicon-container"
            onClick={e => toggleSong(e, idx, song)}
          >
            <img
              id={idx}
              className="playicon"
              src={require("../../resources/music_note_icon.png")}
              alt=""
            />
          </span>
          <span> {song.title}</span>
        </div>
        <div className="menu-songlength">
          <span className="menu">
            <button className="menu-button" onClick={e => this.showMenu(e)}>
              <img
                className="menu-icon"
                src={require("../../resources/menu_icon.png")}
                alt=""
              />
              {this.state.showMenu ? (
                <ul className="song-menu">
                  {favoriteButton(song)}
                  <li
                    className="song-menu-item"
                    onClick={() => this.toggleModal(song)}
                  >
                    Add to Playlist
                  </li>
                </ul>
              ) : null}
            </button>
            <AddToPlaylistModal song={song} user={this.state.user} />
          </span>
          <span> {songLength}</span>
        </div>
      </li>
    );
  }
}

export default SongIndexItem;
