import React from 'react';
import { FETCH_USER_LIBRARY } from "../../graphql/queries";
import { ADD_PLAYLIST_SONG } from '../../graphql/mutations';
import { Query, Mutation } from "react-apollo";
import "./addsongtoplaylistmodal.css";
const jwt = require("jsonwebtoken");

class AddToPlaylistModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.handleClick = this.handleClick.bind(this);
  }



  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
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
    modal.classList.remove('visible');
  }

  render() {
    let id = this.props.song._id + "modal";

    if (this.state.user) {
      return (
        <div id={id} className='add-song-to-playlist-modal'>
          <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user.id }}>
            {({ loading, error, data, client }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              let playlists = data.user.playlists;

              return (
                <Mutation mutation={ADD_PLAYLIST_SONG}>
                  {addPlaylistSong => {
                    return (
                      <ul>
                        {playlists.map(playlist => {
                          return (
                            <li className="playlist-song-modal-item" onClick={() => this.handleClick(addPlaylistSong, playlist)}>
                              <h1>{playlist.title}</h1>
                            </li>
                          )
                        })}
                      </ul>
                    )
                  }}
                </Mutation>
              )
            }}
          </Query>
        </div>
      )
    } else {
      return (
        <div id={id}>
          <h1>MODAL!</h1>
        </div>
      )
    }

  }

}


export default AddToPlaylistModal;