import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUMS } from "../graphql/queries";
import { Link } from "react-router-dom";
import "./Splash.css";

const imagePlayIcon = require('../resources/album_play_icon.png');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlbum: null
    };
  }
  
  playAlbum(e, album) {
    let track = null;

    if (this.props.state.currentTrack === null) {
      const songList = album.songs.map(song => {
        return {
          stream_url: song.audio_url,
          trackTitle: song.title,
          artistName: album.artist.name,
          albumArtUrl: album.album_art_url

        };
      });
      track = 0;
      this.props.newPlayQueue(songList);
      this.props.selectTrack(track);
      this.setState({ currentAlbum: album });

      this.props.togglePlay();
    } else if (this.state.currentAlbum !== album) {
      const songList = album.songs.map(song => {
        return {
          stream_url: song.audio_url,
          trackTitle: song.title,
          artistName: album.artist.name,
          albumArtUrl: album.album_art_url

        };
      });
      track = 0;
      this.props.newPlayQueue(songList);
      this.props.selectTrack(track);
      this.setState({ currentAlbum: album });

      if(!this.props.state.playing) this.props.togglePlay();

    } else {
      this.props.togglePlay();
    }

  }


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
                          onClick={e => this.playAlbum(e, album)}
                        />
                      </div>
                      <Link to={`/album/${album._id}`} style={{ textDecoration: 'none' }}>
                      <h5 className="list-album-title">{album.title}</h5>
                     </Link>

                      <Link to={`/artist/${album.artist._id}`} style={{ textDecoration: 'none' }} >
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
