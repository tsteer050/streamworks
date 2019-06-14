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
      songList: [],
      currentAlbum: null,
      currentIconId: null,
      playIcon: null,
      user: null
    };
    this.artistSongList = null;
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  onHover(elementId) {
    let playIcon = document.getElementById(elementId);

    if (elementId === this.state.currentAlbum) {
      playIcon.src = this.state.playIcon;
    } else {
      playIcon.src = require("../resources/album_play_icon.png");
    }
  }

  offHover(elementId) {
    let element = document.getElementById(elementId);
    element.src = "";
  }
  toggleIcon(iconId) {
    if (this.props.state.playing === false) {
      this.setState({ playIcon: require("../resources/album_pause_icon.png")});
    } else {
      this.setState({ playIcon: require("../resources/album_play_icon.png")});
    }
    let icon = document.getElementById(iconId);
    icon.src = this.state.playIcon;
  }
  playAlbum(e, albumId) {
    if (this.state.currentAlbum === albumId) {
      this.props.togglePlay();
      this.toggleIcon(albumId);
    } else {
      this.setState({
        currentAlbum: albumId
      });
      let playQueue = this.albumSongLists[albumId];
      this.props.newPlayQueue(playQueue);
      this.props.selectTrack(0);
      this.props.togglePlay();
      this.toggleIcon(albumId);
    }
  }

  render() {
    if (!this.state.user) return (<div></div>);

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
          let artistSongList = {};
              
          //render simple message if nothing in library
          if (!data.user.artists.length) {
            
            return (
              <div className="no-artists">Your artists will go here</div>
            )
          }

          const artists = data.user.artists.map((artist, idx) => {

            var sectionStyle = {
              width: "145px",
              height: "145px",
              backgroundImage: `url(${artist.artist_image_url})`,
              borderRadius: "50%",
              backgroundSize: "cover"
            };

            return (
              <li key={artist._id} className="artist-image-container">
                <div
                  className="artist-image"
                  style={sectionStyle}
                  onClick={e => this.playartist(e, artist._id)}
                  onMouseOver={() => this.onHover(artist._id, idx)}
                  onMouseOut={() => {
                    this.offHover(artist._id, idx);
                  }}
                >
                <div className="overlay-artists">
                  <img
                    id={artist._id}
                    className="artist-play-icon"
                    src=""
                    alt=""
                  />
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
          this.artistSongList = artistSongList;

          // artist's background image for header
          // let headerStyle = {
          //   backgroundImage: `url(${artist.artist_image_url})`,
          //   backgroundSize: '100%'
          // };

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
