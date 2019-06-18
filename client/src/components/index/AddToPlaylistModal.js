import React from "react";
import { FETCH_USER_LIBRARY } from "../../graphql/queries";
import { ADD_PLAYLIST_SONG } from "../../graphql/mutations";
import { Query, Mutation } from "react-apollo";
import NewPlaylistNestedModal from "../NewPlaylistNestedModal";
import "./addsongtoplaylistmodal.css";
import * as emptyPlaylistImage from "../../images/empty-playlist.png";
const jwt = require("jsonwebtoken");

class AddToPlaylistModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.addToNewList = this.addToNewList.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  toggleModal() {
    let id = "new-playlist-nested-modal" + this.props.song._id;
    let modal = document.getElementById(id);
    modal.classList.toggle("visible");
  }

  addToNewList(addPlaylistSong, playlistId) {
    let id = this.props.song._id + "modal";
    addPlaylistSong({
      variables: {
        playlistId: playlistId,
        songId: this.props.song._id
      }
    });
    let modal = document.getElementById(id);
    modal.classList.remove("visible");
  }

  handleClick(addPlaylistSong, playlist) {
    let id = this.props.song._id + "modal";
    addPlaylistSong({
      variables: {
        playlistId: playlist._id,
        songId: this.props.song._id
      }
    });
    let modal = document.getElementById(id);
    modal.classList.remove("visible");
  }

  render() {
    let id = this.props.song._id + "modal";

    if (this.state.user) {
      return (
        <div id={id} className="add-song-to-playlist-modal">
          <div className="playlist-song-modal-div">
            <div className="x-button-container">
              <span
                className="x-button playlist-x"
                onClick={() => {
                  let id = this.props.song._id + "modal";
                  let modal = document.getElementById(id);
                  modal.classList.remove("visible");
                }}
              >
                X
              </span>
            </div>
            <h1>Add to Playlist</h1>
            <button
              onClick={e => {
                e.preventDefault();
                this.toggleModal();
              }}
              className="modal-new-playlist-button"
            >
              NEW PLAYLIST
            </button>
            <Query
              query={FETCH_USER_LIBRARY}
              variables={{ id: this.state.user.id }}
            >
              {({ loading, error, data, client }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                let playlists = data.user.playlists;

                return (
                  <Mutation mutation={ADD_PLAYLIST_SONG}>
                    {addPlaylistSong => {
                      return (
                        <div>
                          <ul className="playlists-list">
                            {playlists.map(playlist => {
                              let image;
                              let length = 0;
                              if (playlist.songs.length)
                                length = playlist.songs.length;
                              if (playlist.songs.length) {
                                image = playlist.songs[0].album.album_art_url;
                              } else {
                                image = emptyPlaylistImage;
                              }
                              var sectionStyle = {
                                width: "100%",
                                height: "100%",
                                backgroundImage: `url(${image})`,
                                backgroundSize: "145px"
                              };
                              return (
                                <li
                                  className="playlist-modal-item"
                                  onClick={() =>
                                    this.handleClick(addPlaylistSong, playlist)
                                  }
                                >
                                  <div
                                    className="playlist-image"
                                    style={sectionStyle}
                                  />
                                  <p className="playlist-name">
                                    {playlist.title}
                                  </p>
                                  <p className="playlist-length">
                                    {length} songs
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                          <div
                            id={
                              "new-playlist-nested-modal" + this.props.song._id
                            }
                            className="nested-modal"
                          >
                            <NewPlaylistNestedModal
                              addPlaylistSong={addPlaylistSong}
                              addToNewList={this.addToNewList}
                              toggleModal={this.toggleModal}
                            />
                          </div>
                        </div>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Query>
          </div>
        </div>
      );
    } else {
      return (
        <div id={id}>
          <h1>MODAL!</h1>
        </div>
      );
    }
  }
}

export default AddToPlaylistModal;
