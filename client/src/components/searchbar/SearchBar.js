import React, { Component, Fragment } from "react";
import { SEARCH_QUERY, FETCH_ALBUMS } from "../../graphql/queries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import "./searchbar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "", enter: false };

    this.update = this.update.bind(this);
  }

  update(e) {
    e.preventDefault();
    this.setState({ filter: e.target.value });
  }

  onEnter(e) {
    if (e.key === "Enter") {
      this.setState({ enter: true });
    }
  }

  render() {
    return (
      <div className="search-div">
        <div className="input-header">
          <input
            onKeyPress={this.onEnter.bind(this)}
            onChange={this.update}
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
                console.log("data", data);
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
                              {songs.map(song => {
                                if (song.title) {
                                  return (
                                    <li key={song._id}>
                                      {song.title}
                                      <div className="song-p">
                                        <p>
                                          <Link
                                            to={`/artist/${
                                              song.album.artist._id
                                            }`}
                                          >
                                            {song.album.artist.name}
                                          </Link>
                                        </p>
                                        <span className="star">*</span>
                                        <p>
                                          <Link to={`/album/${song.album._id}`}>
                                            {song.album.title}
                                          </Link>
                                        </p>
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

export default SearchBar;
