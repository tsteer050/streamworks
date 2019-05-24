import React from 'react';

class SongIndexItem extends React.Component {




  render() {
    return (
      <li key={song._id} onMouseOver={() => { this.onHover(song._id, idx) }}
        onMouseOut={() => { this.offHover(song._id, idx) }}
      >
        <div className="playicon-songname">
          <span className="playicon-container" onClick={e => this.toggleSong(e, idx, song._id)}>
            <img id={song._id} className="playicon" src={require('../resources/music_note_icon.png')}
              alt=""
            />
          </span>
          <span id="1"> {song.title}</span>
        </div>
        <div className="menu-songlength">
          <span className="menu">
            <img className="menu-icon" src={require('../resources/menu_icon.png')} alt="" />
          </span>
          <span> {songLength}</span>
        </div>
      </li>
    )
  }
}

export default SongIndexItem;