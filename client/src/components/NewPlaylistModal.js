import React from 'react';
import { Mutation } from "react-apollo";
import { CREATE_PLAYLIST } from "../graphql/mutations";
import './library.css';
import { withRouter } from 'react-router-dom';


class NewPlaylistModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  resetTitle() {
    this.setState({ title: "" });
  }

  handleSubmit(e, newPlaylist) {
    e.preventDefault();
    newPlaylist({
      variables: {
        title: this.state.title
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_PLAYLIST}
        onCompleted={data => {
          const id = data.newPlaylist._id;
          this.setState({ title: "" });
          this.props.history.push(`/playlists/${id}`);
        }}
      >
        {newPlaylist => (
          <form className="new-playlist-form"
            onSubmit={e => this.handleSubmit(e, newPlaylist)}
          >
            <button className="x-button" onClick={() => { this.resetTitle(); this.props.toggleModal(); } }>X</button>
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
              <button onClick={e => { e.preventDefault(); this.resetTitle(); this.props.toggleModal(); }} className="new-playlist-cancel-button">CANCEL</button>
              <button type="submit" className="new-playlist-submit-button">SUBMIT</button>
            </div>
          </form>
        )}
      </Mutation>
    )
  }
}
export default withRouter(NewPlaylistModal);