import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUMS } from "../graphql/queries";
import "./Splash.css";

class Splash extends React.Component {
  render() {
    return (
      <Fragment>
        <Query query={FETCH_ALBUMS}>
          {({ loading, error, data }) => {
            if (loading) return <div className="loading-screen" />;
            if (error) return `Error! ${error.message}`;

            return (
              <div className="splash-container">
                <h1>Top recommendations for you</h1>
                <ul id="splash">
                  {data.albums.map(album => (
                    <li key={album._id}>
                      <img className="list-album-art" src={album.album_art_url} alt={album.title} onClick={() => this.props.history.push(`/album/${album._id}`)} />
                      <h5 className="list-album-title">{album.title}</h5>
                      <h5 className="list-album-artist-name">{album.artist.name}</h5>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
};

export default Splash;

