import React from 'react';

class SongIndexItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { song, idx, onHover, offHover, toggleSong, songLength } = this.props;
    
    return (
      <li key={song._id} onMouseOver={() => { onHover(song._id, idx) }}
        onMouseOut={() => { offHover(song._id, idx) }}
      >
        <div className="playicon-songname">
          <span className="playicon-container" onClick={e => toggleSong(e, idx, song._id)}>
            <img id={song._id} className="playicon" src={require('../../resources/music_note_icon.png')}
              alt=""
            />
          </span>
          <span id="1"> {song.title}</span>
        </div>
        <div className="menu-songlength">
          <span className="menu">
            <img className="menu-icon" src={require('../../resources/menu_icon.png')} alt="" />
          </span>
          <span> {songLength}</span>
        </div>
      </li>
    )
  }
}

export default SongIndexItem;