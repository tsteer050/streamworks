import React from "react";
import { Query } from "react-apollo";
import { FETCH_USER_LIBRARY } from "../graphql/queries";
import "./LibraryCSS/LibraryAlbums.css";
import "./LibraryCSS/LibraryArtists.css";
import { Link } from "react-router-dom";

const jwt = require("jsonwebtoken");

class LibraryArtists extends React.Component {
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

  render() {
    if (!this.state.user) return <div />;

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

          //render simple message if nothing in library
          if (!data.user.artists.length) {
            return <div className="no-artists">Your artists will go here</div>;
          }

          // create array of user's artists for display
          const artists = data.user.artists.map((artist, idx) => {
            return (
              <li key={artist._id} className="artist-image-container">
                <div>
                  <div className="overlay-artists">
                    <Link to={`/artist/${artist._id}`}>
                      <img
                        className="artist-image"
                        src={artist.artist_image_url}
                        alt="artist"
                      />
                    </Link>
                  </div>
                </div>

                <Link
                  to={`/artist/${artist._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="artist-artist-name">{artist.name}</p>
                </Link>
              </li>
            );
          });

          return (
            <div className="library-artists-show">
              <ul className="artists-list">{artists}</ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LibraryArtists;
