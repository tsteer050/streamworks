import React from "react";
import { Mutation } from "react-apollo";
import { ADD_PLAYLIST_SONG } from "../graphql/mutations";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from '../graphql/queries';
import "./library.css";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./addsongtoplaylist.css";
const jwt = require("jsonwebtoken");


class AddSongToPlaylistModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  // handleSubmit(e, newPlaylist) {
  //   e.preventDefault();
  //   if (this.state.user) {
  //     newPlaylist({
  //       variables: {
  //         title: this.state.title,
  //         ownerId: this.state.user.id
  //       }
  //     });
  //   }
  // }

  render() {
    // THIS NEEDS TO BE REPLACED ENTIRELY
    return (
      <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user.id }} >
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
          if (!data.user.playlists.length) {
            return (
              <div className="no-playlists">Your Playlists will go here</div>
            )
          }
          let playListSongLists = [];
          const playLists = data.user.playlists.map((playList, idx) => {

            playListSongLists[playList._id] = playList.songs.map(song => {
              return {
                stream_url: song.audio_url,
                trackTitle: song.title,
                artistName: song.artist.name,
                albumArtUrl: song.album.album_art_url
              };
            });

            let songLength = null;
            var sectionStyle = {
              width: "100%",
              height: "100%",
              backgroundImage: `url(${playList.playlist_art_url})`,
              backgroundSize: "145px"
            };

            return (
              <li key={playList._id} className="playlist-image-container">
                <div
                  className="playlist-image"
                  style={sectionStyle}
                  onClick={e => this.playPlaylist(e, playList._id)}
                  onMouseOver={() => this.onHover(playList._id, idx)}
                  onMouseOut={() => {
                    this.offHover(playList._id, idx);
                  }}
                >
                  <img
                    id={playList._id}
                    className="playlist-play-icon"
                    src=""
                    alt=""
                  />
                </div>
                <Link
                  to={`/playlists/${playList._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="playlist-name">{playList.title}</p>
                </Link>
              </li>
            );
          });
          this.playListSongLists = playListSongLists;



          return (
            <div className="library-albums-show">
              <div className="albums-section">
                <ul className="albums-list">{playLists}</ul>
              </div>
            </div>
          );
        }}
      </Query>











      // <Mutation mutation={ADD_PLAYLIST_SONG} >
      //   {addPlaylistSong => (

          // <form
          //   className="new-playlist-form"
          //   onSubmit={e => this.handleSubmit(e, newPlaylist)}
          // >
          //   <button
          //     className="x-button"
          //     onClick={() => {
          //       this.resetTitle();
          //       this.props.toggleModal();
          //     }}
          //   >
          //     X
          //   </button>
          //   <h1>Create new playlist</h1>
          //   <div>
          //     <input
          //       type="text"
          //       className="playlist-input-box"
          //       placeholder="Start Typing . . ."
          //       value={this.state.title}
          //       onChange={this.update("title")}
          //     />
          //   </div>
          //   <div className="new-playlist-form-buttons">
          //     <div>
          //       <button
          //         onClick={e => {
          //           e.preventDefault();
          //           this.resetTitle();
          //           this.props.toggleModal();
          //         }}
          //         className="new-playlist-cancel-button"
          //       >
          //         CANCEL
          //       </button>
          //     </div>
          //     <div>
          //       <button
          //         type="submit"
          //         className="new-playlist-submit-button new-playlist-button"
          //       >
          //         SUBMIT
          //       </button>
          //     </div>
          //   </div>
          // </form>
        // )}
      // </Mutation>
    );
  }
}
export default withRouter(AddSongToPlaylistModal);
