import React from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUM } from "../graphql/queries";
import "./AlbumShow.css";
import { constants } from "fs";

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
  }
  // onHover(elementId) {
  //   let element = document.getElementById("1");
  //   element.src = require('../resources/music_note_icon.png');
  // }
  render() {
    const id = this.props.match.params.id;
    
    return (
      <Query query={FETCH_ALBUM} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          const songs = data.album.songs.map( song=> {
            let songLength = null;
            if((song.length % 60) >= 10){
              songLength = `${Math.floor(parseInt(song.length) / 60)}:${song.length % 60}`
            }
            else{ 
              songLength = `${Math.floor(parseInt(song.length) / 60)}:0${song.length % 60}`
            }
            return (
              <li id={song._id} >
                <div className="playicon-songname">
                  <span className="playicon-container">
                    <img id={`${song._id}image`} className="playicon" src={require('../resources/music_note_icon.png')} 
                    
                      />
                  </span>
                  <span id="1"> {song.title}</span>
                </div>
                <div className="menu-songlength">
                  <span className="menu">MENU</span><span> {songLength}</span>
                </div>
              </li>
            )
          })
          return (
            <div id="album-show">
              <div id="left-column">
                <div id="album-photo-container">
                  <img id="album-photo" src={`${data.album.album_art_url}`} />
                </div>
                <p id="album-name">{data.album.title}</p>
                <p id="artist-name">{data.album.artist.name}</p>
                <button id="play">PLAY</button>
                <div id="more-info">
                  <p>(YEAR)    {`${data.album.songs.length} SONGS`}</p>
                </div>

                <div id="more-buttons">
                  <img id="favorite" src={require('../resources/favorite_icon.png')} />
                  <img id="menu" src={require('../resources/menu_icon.png')} />
                </div>
              </div>

              <div id="right-column">
                <ul id="songs-list">
                  {songs}
                </ul>
              </div>
            
            </div>
          );

        }}
      </Query>
    );
  }
};

export default AlbumShow;

