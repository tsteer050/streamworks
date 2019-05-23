import React from "react";
import { Query } from "react-apollo";
import { FETCH_ARTIST } from "../graphql/queries";
import "./ArtistShow.css";
import { Link } from 'react-router-dom';
import { selectTrack, togglePlay } from "../util/redux_config";

const playIcon = require('../resources/play_icon.png');
const pauseIcon = require('../resources/pause_icon.png');
const musicNoteIcon = require('../resources/music_note_icon.png');

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList: [],
      currentTrack: null,
      currentIconId: null
    };
    this.defaultTrack = null;
    this.songList = null;
  }



  onHover(elementId, track) {
    if (elementId === "albumImage") {
      let albumImage = document.getElementById(elementId);

    }
    let element = document.getElementById(elementId);

    if (this.props.state.playing === true && this.state.currentTrack === track) {
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
    this.props.newPlayQueue(this.songList);
    track = track || 0;
    iconElementId = iconElementId || this.defaultTrack;

    let element = document.getElementById(iconElementId);
    let playButton = document.getElementById("playButton");
    let albumImage = document.getElementById("albumImage");

    if (track === this.state.currentTrack) {

      if (this.props.state.playing === false) {
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
      element.src = pauseIcon;
      playButton.innerHTML = "PLAY";
      this.setState({ currentTrack: track });

      // set previous track's icon back to music note
      if (this.state.currentIconId) document.getElementById(this.state.currentIconId).src = musicNoteIcon;

      this.setState({ currentIconId: iconElementId });
      this.props.selectTrack(track);
      this.props.togglePlay();
    }
    //this.props.togglePlay();

  }

  render() {
    const id = this.props.match.params.id;

    return (
      <Query query={FETCH_ARTIST} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          // const songList = data.album.songs.map(song => {

          //   return {
          //     streamUrl: song.audio_url,
          //     trackTitle: song.title,
          //     artistName: data.album.artist.name,
          //     albumArtUrl: data.album.album_art_url
          //   };
          // });
          // this.songList = songList;
          // this.props.newPlayQueue(songList)

          //create array of album's songs
          const albums = data.artist.albums.map((album, idx) => {

            // if (idx === 0) this.defaultTrack = song._id;

            let songLength = null;
            debugger
            var sectionStyle = {
              width: "100%",
              height: "100%",
              backgroundImage: `url(${album.album_art_url})`,
              backgroundSize: '145px'
            };
            

      return (
              <li key={album._id} className="album-image-container">
                <Link to={`/album/${album._id}`} >
                  <div className="album-image" style={ sectionStyle }>
                      {/* <img id={song._id} className="playicon" src={require('../resources/music_note_icon.png')}
                        alt=""
                      /> */}
                  </div>
                  <p className="artist-album-name">{album.name}</p>
                </Link>
                <p className="artist-artist-name">{data.artist.name}</p>
              </li>
            )
          })
          // artist's background image for header
          let headerStyle = {
            backgroundImage: `url(${data.artist.artist_image_url})`,
            backgroundSize: '100%'
          };

          return (
            <div className="artist-show">
              <div className="title-header" style={ headerStyle }>
                <p className="artist-name">{data.artist.name}</p>
                <div className="header-buttons">
                  <button id="playButton" className="artist-play" 
                  > PLAY
                  </button>
                  <img className="artist-favorite" src={require('../resources/favorites_icon.png')} alt="" />
                  <img className="menu-icon" src={require('../resources/menu_icon.png')} alt="" />
                </div>
              </div>

              <div className="albums-section">
                <h2 className="albums-header">Albums</h2>
                <ul className="albums-list">
                  {albums}
                </ul>
              </div>

            </div>
          );

        }}
      </Query>
    );
  }
};

export default ArtistShow;

{/* <div className="more-info">
  <p>(YEAR)    {`${data.album.songs.length} SONGS`}</p>
</div> */}