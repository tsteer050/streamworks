import React from "react";
import './AudioPlayer.css';
import { Query } from 'react-apollo';

class AudioPlayer extends React.Component {

  render() {

    return (

        <div id="audio-player-bar">
          <div id="sidebar-footer">
            <p id="audio-player">AUDIO PLAYER</p>
          </div>
        </div>
    )
  }
};

export default AudioPlayer;