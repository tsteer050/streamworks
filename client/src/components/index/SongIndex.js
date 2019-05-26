import React, { Fragment } from 'react';
import SongIndexItem from './SongIndexItem';

class SongIndex extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { songs, onHover, offHover, toggleSong } = this.props;

    const mappedSongs = songs.map((song, idx) => {
      if (idx === 0) this.defaultTrack = song._id;

      let songLength = null;
      if ((song.length % 60) >= 10) {
        songLength = `${Math.floor(parseInt(song.length) / 60)}:${song.length % 60}`;
      } else {
        songLength = `${Math.floor(parseInt(song.length) / 60)}:0${song.length % 60}`;
      }
      return (
        <Fragment>
         <SongIndexItem song={song} idx={idx} onHover={onHover} offHover={offHover} toggleSong={toggleSong} songLength={songLength} />
        </Fragment>
      )
    });
    return (
      <ul className="songs-list">
        {mappedSongs}
      </ul>
    )
  }
}

export default SongIndex;