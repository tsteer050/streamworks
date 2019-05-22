import React from "react";
import './AudioPlayer.css';
import { Query } from 'react-apollo';
import AWSSoundPlayer from './DemoPlayer';



const streamUrl = 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Long+Live+the+King+1.m4a';
const trackTitle = 'Long Live the King';
const artistName = 'Organ Freeman';


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.nextTrack = this.nextTrack.bind(this);
    this.prevTrack = this.prevTrack.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    this.props.togglePlay();
  }
  
  nextTrack() {
    let currentTrack = this.props.state.currentTrack;
    currentTrack += 1;
    this.props.selectTrack(currentTrack);
  }

  prevTrack() {
    let currentTrack = this.props.state.currentTrack;
    currentTrack += 1;
    if (currentTrack < 0) currentTrack = 0;
    this.props.selectTrack(currentTrack);
  }

  render() {
    const track = this.props.state.playQueue[this.props.state.currentTrack] || {
      streamUrl: "https://s3.us-east-2.amazonaws.com/streamworks-songs/Long+Live+the+King+1.m4a",
      trackTitle: "Long Live the King",
      artistName: "Organ Freeman",
      albumArtUrl: "https://m.media-amazon.com/images/I/81mBzkImdvL._SS500_.jpg"
    };

    return (

        <div id="audio-player-bar">
          <AWSSoundPlayer
            id="audio-player"
            streamUrl={track.streamUrl}
            trackTitle={track.trackTitle}
            artistName={track.artistName}
            albumArtUrl={track.albumArtUrl}
            prevTrack={this.prevTrack}
            nextTrack={this.nextTrack}
            togglePlay={this.togglePlay}
            playing={this.props.state.playing}
              />
        </div>
    )
  }
};

export default AudioPlayer;