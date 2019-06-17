import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUMS } from "../graphql/queries";
import { Link } from "react-router-dom";
import "./Splash.css";

const imagePlayIcon = require('../resources/album_play_icon.png');
const imagePauseIcon = require('../resources/album_pause_icon.png');

class Splash extends React.Component {

  

  render() {
    return (
      <Fragment>
        <Query query={FETCH_ALBUMS}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div className="loading-screen">
                  <div className="lds-facebook">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              );
            if (error) return `Error! ${error.message}`;

            return (
              <div className="splash-container">
                <h1>Top recommendations for you</h1>
                <ul id="splash">
                  {data.albums.map(album => (
                    <li key={album._id}>
                      <img
                        className="list-album-art"
                        src={album.album_art_url}
                        alt={album.title}
                        onClick={() =>
                          this.props.history.push(`/album/${album._id}`)
                        }
                      />
                      <div className="splash-overlay" onClick={e => {
                        if(e.target.className === "splash-play-icon") {
                          e.stopPropagation();
                          return;
                        }
                        this.props.history.push(`/album/${album._id}`)
                      }}>
                        <img
                          id="albumImage"
                          className="splash-play-icon"
                          alt=""
                          src={imagePlayIcon}
                        />
                      </div>
                     
                      <h5 className="list-album-title">{album.title}</h5>
                      <Link to={`/artist/${album.artist._id}`}>
                        <h5 className="list-album-artist-name">
                          {album.artist.name}
                        </h5>
                      </Link>
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
}

export default Splash;
