import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_PLAYLIST } from "../graphql/mutations";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./library.css";
import { withRouter } from "react-router-dom";
const jwt = require("jsonwebtoken");


class NewPlaylistNestedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      user: null
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  resetTitle() {
    this.setState({ title: "" });
  }

  handleSubmit(e, newPlaylist) {
    e.preventDefault();
    if (this.state.user) {
      newPlaylist({
        variables: {
          title: this.state.title,
          ownerId: this.state.user.id
        }
      });
    }
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_PLAYLIST}
        update={(cache, { data: { newPlaylist } }) => {
          const { user } = cache.readQuery({ query: FETCH_USER_LIBRARY, variables: { id: this.state.user.id } });
          const { playlists } = user;
          playlists.push(newPlaylist);
          user.playlists = playlists;
          cache.writeQuery({
            query: FETCH_USER_LIBRARY,
            data: { user },
          });
        }}
        onCompleted={data => {

          const id = data.newPlaylist._id;
          this.resetTitle();
          this.props.addToNewList(this.props.addPlaylistSong, data.newPlaylist._id);
          this.props.history.push(`/playlists/${id}`);
        }}
      >
        {newPlaylist => (
          <form
            className="new-playlist-form"
            onSubmit={e => this.handleSubmit(e, newPlaylist)}
          >
            <span
              className="x-button"
              onClick={() => {
                this.resetTitle();
                this.props.toggleModal();
              }}
            >
              X
            </span>
            <h1>Create new playlist</h1>
            <div>
              <input
                type="text"
                className="playlist-input-box"
                placeholder="Start Typing . . ."
                value={this.state.title}
                onChange={this.update("title")}
              />
            </div>
            <div className="new-playlist-form-buttons">
              <div>
                <button
                  onClick={e => {
                    e.preventDefault();
                    this.resetTitle();
                    this.props.toggleModal();
                  }}
                  className="new-playlist-cancel-button"
                >
                  CANCEL
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="new-playlist-submit-button new-playlist-button"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}
export default withRouter(NewPlaylistNestedModal);
