import React from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUM } from "../graphql/queries";
import "./AlbumShow.css";
import { constants } from "fs";
import { selectTrack, togglePlay } from "../util/redux_config";

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentlyPlaying: {}
    };
    this.songList = null;
  }

  onHover(elementId) {
    let element = document.getElementById(elementId);

    element.src = require("../resources/play_icon.png");
  }
  offHover(elementId) {
    let element = document.getElementById(elementId);

    element.src = require("../resources/music_note_icon.png");
  }

  toggleSong(e, songId) {
<<<<<<< HEAD
    this.props.selectTrack(3);
    this.props.togglePlay();
    debugger;
=======
    this.props.newPlayQueue(this.songList);
    this.props.selectTrack(3);
    this.props.togglePlay();
    
    
>>>>>>> master
  }

  render() {
    const id = this.props.match.params.id;

    return (
      <Query query={FETCH_ALBUM} variables={{ id }}>
        {({ loading, error, data }) => {
<<<<<<< HEAD
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          // if (!this.props.newPlayQueue.length) this.props.newPlayQueue = data.album.songs.map(song => {
          //     return {
          //       streamUrl: song.audio_url,
          //       trackTitle: song.title,
          //       artistName: data.album.artist.name,
          //       albumArtUrl: data.album.album_art_url
          //     };
          //   });

          const songs = data.album.songs.map(song => {
=======
          
          if (loading) return <div className="loading-screen" />;
          if (error) return `Error! ${error.message}`;

          const songList = data.album.songs.map(song => {
              
              return {
                streamUrl: song.audio_url,
                trackTitle: song.title,
                artistName: data.album.artist.name,
                albumArtUrl: data.album.album_art_url
              }; 
            });
            this.songList = songList;
          debugger
          // this.props.newPlayQueue(songList)

          const songs = data.album.songs.map( song=> {
>>>>>>> master
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
                key={song._id}
                onMouseOver={() => {
                  this.onHover(song._id);
                }}
                onMouseOut={() => {
                  this.offHover(song._id);
                }}
              >
                <div className="playicon-songname">
                  <span
                    className="playicon-container"
                    onClick={e => this.toggleSong(e, song._id)}
                  >
                    <img
                      id={song._id}
                      className="playicon"
                      src={require("../resources/music_note_icon.png")}
                    />
                  </span>
                  <span id="1"> {song.title}</span>
                </div>
                <div className="menu-songlength">
                  <span className="menu">
                    <img
                      className="menu-icon"
                      src={require("../resources/menu_icon.png")}
                    />
                  </span>
                  <span> {songLength}</span>
                </div>
              </li>
            );
          });

          return (
            <div className="album-show">
              <div className="left-column">
                <div className="album-photo-container">
                  <img
                    className="album-photo"
                    src={`${data.album.album_art_url}`}
                  />
                </div>
                <p className="album-name">{data.album.title}</p>
                <p className="artist-name">{data.album.artist.name}</p>
                <button className="play">PLAY</button>
                <div className="more-info">
                  <p>(YEAR) {`${data.album.songs.length} SONGS`}</p>
                </div>

                <div className="more-buttons">
                  <img
                    className="favorite"
                    src={require("../resources/favorites_icon.png")}
                  />
                  <img
                    className="menu-icon"
                    src={require("../resources/menu_icon.png")}
                  />
                </div>
              </div>

              <div className="right-column">
                <ul className="songs-list">{songs}</ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AlbumShow;
