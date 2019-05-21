import React from "react";
import './AudioPlayer.css';
import { Query } from 'react-apollo';
import AWSSoundPlayer from './DemoPlayer';


const streamUrl = 'https://s3.us-east-2.amazonaws.com/streamworks-songs/Long+Live+the+King+1.m4a';
const trackTitle = 'Long Live the King';
const artistName = 'Organ Freeman';


class AudioPlayer extends React.Component {


  render() {

    return (

        <div id="audio-player-bar">
          <AWSSoundPlayer
            id="audio-player"
            streamUrl={streamUrl}
            trackTitle={trackTitle}
            artistName={artistName}
              />
        </div>
    )
  }
};

export default AudioPlayer;