import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUM, IS_LOGGED_IN, FETCH_USER_LIBRARY } from "../graphql/queries";
import { ADD_USER_ALBUM, REMOVE_USER_ALBUM } from '../graphql/mutations';
import "./AlbumShow.css";
import { Link } from 'react-router-dom';
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import Modal from "./Modal";
import SongIndex from './index/SongIndex';
const jwt = require("jsonwebtoken");

const playIcon = require('../resources/play_icon.png');
const pauseIcon = require('../resources/pause_icon.png');
const musicNoteIcon = require('../resources/music_note_icon.png');

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentTrack: null,
      currentIconId: null,
      user: null
    };
    this.isLoggedIn = null;
    this.defaultTrack = null;
    this.songList = null;

    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
    this.toggleSong = this.toggleSong.bind(this);

  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");
    const user = jwt.decode(token);
    this.setState({ user });
  }

  
  
  onHover(elementId, track) {
    if(elementId === "albumImage") {
      let albumImage = document.getElementById(elementId);

    }
    let element = document.getElementById(elementId);

   if(this.props.state.playing === true && this.state.currentTrack === track) {
    element.src = pauseIcon;
   } else {
    element.src = playIcon;
   }
  }
  offHover(elementId, track) {

    let element = document.getElementById(elementId);
    if (this.state.currentTrack !== track) {
      element.src = require('../resources/music_note_icon.png');
    } 
  }

  toggleSong(e, track, iconElementId) {

    track = track || 0;
    iconElementId = iconElementId || this.defaultTrack;
    
    let element = document.getElementById(iconElementId);
    let playButton = document.getElementById("playButton");
    let albumImage = document.getElementById("albumImage");

    if(track === this.state.currentTrack) {
      if(this.props.state.playing === false) {
        element.src = pauseIcon;
        playButton.innerHTML = "PLAY";
        //albumImage
        this.props.togglePlay();
      } else {
        element.src = playIcon;
        playButton.innerHTML = "PAUSE";
        this.props.togglePlay();
      }

    } else {
      this.props.newPlayQueue(this.songList);
      element.src = pauseIcon;
      playButton.innerHTML = "PLAY";
      this.setState({ currentTrack: track});

      // set previous track's icon back to music note
      if(this.state.currentIconId) document.getElementById(this.state.currentIconId).src= musicNoteIcon;

      this.setState( {currentIconId: iconElementId});
      this.props.selectTrack(track);
      this.props.togglePlay();
    }  
  }

  render() {
    const id = this.props.match.params.id;

    let favoriteButton;
    if (this.state.user) {
      favoriteButton = () => {
        return (
          <Query query={FETCH_USER_LIBRARY} variables={{ id: this.state.user }}>
            {({ loading, error, data, client }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              return (
                <Mutation 
                  mutation={ADD_USER_ALBUM}
                  // onCompleted={data => {
                  //   const { token } = data.login;
                  //   localStorage.setItem("auth-token", token);
                  //   this.props.history.push("/");
                  // }}
                  >
                  {addUserAlbum => {
                    <Mutation>

                    </Mutation>


                  }}

                </Mutation>
              )
            }}
          </Query>
        )
      }
    } else {
      favoriteButton = () => {
        return ( 
          <img className="favorite" src={require('../resources/favorites_icon.png')} alt="" />
        )
      }
    }
    
    return ( 
      <Query query={FETCH_ALBUM} variables={{ id }}>
        {({ loading, error, data, client }) => {          
          if (loading) return "Loading...";
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
          
          const songIndex = <SongIndex songs={data.album.songs} onHover={this.onHover} offHover={this.offHover} toggleSong={this.toggleSong} />;

          return (
            <div className="album-show">
              <div className="left-column">
                <div className="album-photo-container">
                  <img id="albumImage" className="album-photo" src={`${data.album.album_art_url}`} alt=""
                    onClick={e => this.toggleSong(e, this.state.currentTrack, this.state.currentIconId)}/>
                </div>
                <p className="album-name">{data.album.title}</p>
                <Link to={`/artist/${data.album.artist._id}`}><p className="album-artist-name">{data.album.artist.name}</p></Link>
                <button id="playButton" className="play" onClick={e => this.toggleSong(e, this.state.currentTrack, this.state.currentIconId)}
                  >PLAY</button>
                <div className="more-info">
                  {/* <p>(YEAR)</p>     */}
                  <p>{`${data.album.songs.length} SONGS`}</p>
                </div>
                <div className="more-buttons">
                  {favoriteButton()}
                  <img className="menu-icon" src={require('../resources/menu_icon.png')} alt=""/>
                </div>
              </div>
              <div className="right-column">      
                {songIndex}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default AlbumShow;

