import React, { Component, Fragment } from "react";
import { debounce } from "lodash";
import { SEARCH_QUERY } from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import withRedux from "../../util/redux_container";

import "./searchbar.css";

const playIcon = require("../../resources/play_icon.png");
const pauseIcon = require("../../resources/pause_icon.png");
const musicNoteIcon = require("../../resources/music_note_icon.png");

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      enter: false,
      songList: [],
      currentTrack: null,
      currentIconId: null
    };
    this.isLoggedIn = null;
    this.defaultTrack = null;
    this.songList = null;

    this.update = this.update.bind(this);
  }

  update = debounce(text => {
    this.setState({ filter: text });
  }, 1000);

  onHover(elementId, track) {
    let element = document.getElementById(elementId);

    if (
      this.props.state.playing === true &&
      this.state.currentTrack === track
    ) {
      element.src = pauseIcon;
    } else {
      element.src = playIcon;
    }
  }

  offHover(elementId, track) {
    let element = document.getElementById(elementId);
    if (this.state.currentTrack !== track) {
      element.src = musicNoteIcon;
    }
  }

  toggleSong(e, track, iconElementId) {
    track = track || 0;
    iconElementId = iconElementId || this.defaultTrack;

    let element = document.getElementById(iconElementId);
    let play = document.getElementById("search-play-btn");

    if (track === this.state.currentTrack) {
      if (this.props.state.playing === false) {
        element.src = pauseIcon;
        play.src = pauseIcon;
        //albumImage
        this.props.togglePlay();
      } else {
        element.src = playIcon;
        play.src = playIcon;
        this.props.togglePlay();
      }
    } else {
      this.props.newPlayQueue(this.songList);
      element.src = pauseIcon;
      play.src = pauseIcon;
      this.setState({ currentTrack: track });

      // set previous track's icon back to music note
      if (this.state.currentIconId)
        document.getElementById(this.state.currentIconId).src = musicNoteIcon;

      this.setState({ currentIconId: iconElementId });
      this.props.selectTrack(track);
      this.props.togglePlay();
    }
  }

  render() {
    return (
      <div className="search-div">
        <div className="input-header">
          <input
            onChange={e => this.update(e.target.value)}
            type="text"
            className="input-box"
            placeholder="Start Typing . . ."
          />
        </div>
        <section className="search-results2">
          {this.state.filter ? (
            <Query
              query={SEARCH_QUERY}
              variables={{ filter: this.state.filter }}
            >
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

                let songs = data.search.filter(
                  result => result.__typename === "SongType"
                );

                // create songlist for playqueu
                const songList = songs.map((song, idx) => {
                  return {
                    streamUrl: song.audio_url,
                    trackTitle: song.title,
                    artistName: song.album.artist.name,
                    albumArtUrl: song.album.album_art_url
                  };
                });

                this.songList = songList;

                let albums = data.search.filter(
                  result => result.__typename === "AlbumType"
                );

                let artists = data.search.filter(
                  result => result.__typename === "ArtistType"
                );

                return (
                  <div className="outer-div">
                    <h6 className="top-results">TOP RESULTS</h6>
                    <div className="search-results">
                      <div className="results-div">
                        {songs.length === 0 ? null : (
                          <Fragment>
                            <div className="results-photo">
                              <img
                                className="results-img"
                                src={songs[0].album.artist.artist_image_url}
                                alt="artist"
                              />
                              <button
                                onClick={e =>
                                  this.toggleSong(e, 0, songs[0]._id)
                                }
                                class="btn"
                              >
                                <img
                                  id="search-play-btn"
                                  src={playIcon}
                                  alt="play"
                                />
                              </button>
                              <div className="results-p">
                                <p>{songs[0].title}</p>
                                <p className="last-p">
                                  <Link
                                    to={`/artist/${songs[0].album.artist._id}`}
                                  >
                                    {songs[0].album.artist.name}
                                  </Link>
                                </p>
                              </div>
                            </div>
                            <ul className="result-list">
                              {songs.map((song, idx) => {
                                if (song.title) {
                                  if (idx === 0) this.defaultTrack = song._id;

                                  let songLength = null;
                                  if (song.length % 60 >= 10) {
                                    songLength = `${Math.floor(
                                      parseInt(song.length) / 60
                                    )}:${song.length % 60}`;
                                  } else {
                                    songLength = `${Math.floor(
                                      parseInt(song.length) / 60
                                    )}:0${song.length % 60}`;
                                  }

                                  return (
                                    <li
                                      className="search-results-playlist"
                                      key={song._id}
                                      onMouseOver={() => {
                                        this.onHover(song._id, idx);
                                      }}
                                      onMouseOut={() => {
                                        this.offHover(song._id, idx);
                                      }}
                                    >
                                      <div className="playicon-songname">
                                        <span
                                          className="playicon-container"
                                          onClick={e =>
                                            this.toggleSong(e, idx, song._id)
                                          }
                                        >
                                          <img
                                            id={song._id}
                                            className="playicon"
                                            src={musicNoteIcon}
                                            alt=""
                                          />
                                        </span>
                                        <span className="song-info-container">
                                          <span id="1"> {song.title}</span>

                                          <div className="song-artist-album">
                                            <Link
                                              to={`/artist/${
                                                song.album.artist._id
                                              }`}
                                            >
                                              <span className="song-artist">
                                                {song.album.artist.name}
                                              </span>
                                            </Link>
                                            <span className="star">*</span>
                                            <Link
                                              to={`/album/${song.album._id}`}
                                            >
                                              <span className="song-album">
                                                {song.album.title}
                                              </span>
                                            </Link>
                                          </div>
                                        </span>
                                      </div>
                                      <div className="menu-songlength">
                                        <span className="menu">
                                          <img
                                            className="menu-icon"
                                            src={require("../../resources/menu_icon.png")}
                                            alt=""
                                          />
                                        </span>
                                        <span> {songLength}</span>
                                      </div>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          </Fragment>
                        )}
                      </div>
                    </div>
                    <div className="artist-results">
                      <h1 className="results-header">Artists</h1>
                      {artists.length === 0 ? (
                        <div className="no-results">
                          <h4>No results</h4>
                        </div>
                      ) : (
                        <ul className="artist-results-list">
                          {artists.map(artist => {
                            return (
                              <li>
                                <div className="artist-li-div">
                                  <Link to={`/artist/${artist._id}`}>
                                    <img
                                      className="artist-result-pic"
                                      src={artist.artist_image_url}
                                      alt="artist"
                                    />
                                    <p>{artist.name}</p>
                                  </Link>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    <div className="album-results">
                      <h1 className="albums-header2">Albums</h1>
                      {albums.length === 0 ? (
                        <div className="no-results">
                          <h4>No results</h4>
                        </div>
                      ) : (
                        <ul className="albums-list2">
                          {albums.map(album => {
                            return (
                              <li>
                                <div className="albums--photo">
                                  <Link
                                    className="albums-search-list"
                                    to={`/album/${album._id}`}
                                  >
                                    <img
                                      className="results-img"
                                      src={album.album_art_url}
                                      alt="artist"
                                    />
                                    <div className="results-p">
                                      <p>{album.title}</p>
                                      <p className="last-p">
                                        {album.artist.name}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              }}
            </Query>
          ) : null}
        </section>
      </div>
    );
  }
}

export default withRedux(SearchBar);
