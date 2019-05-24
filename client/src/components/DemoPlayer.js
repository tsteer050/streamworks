import React, { Component } from "react";
import PropTypes from "prop-types";
import { withCustomAudio } from "react-soundplayer/addons";
import {
  PlayButton,
  VolumeControl,
  Progress,
  Icons,
  NextButton,
  PrevButton
} from "react-soundplayer/components";
import "./demoplayer.css";

const { PlayIconSVG, NextIconSVG, PrevIconSVG } = Icons;

class AWSSoundPlayer extends Component {
  convertTime(time) {
    let roundedTime = Math.round(time);
    let minutes = 0;
    let seconds = roundedTime;
    let timeString = "";
    if (roundedTime >= 60) {
      minutes = Math.round(roundedTime / 60);
      seconds = roundedTime % 60;
    }
    if (minutes < 10) {
      timeString += "0";
    }
    timeString += minutes.toString() + ":";
    if (seconds < 10) {
      timeString += "0";
    }
    timeString += seconds.toString();
    return timeString;
  }

  componentDidUpdate() {
    if (this.props.state.playQueue.length > 0) {
      const track = this.props.state.playQueue[this.props.state.currentTrack];
      this.props.soundCloudAudio._track.stream_url = track.streamUrl;
    }
    if (this.props.state.playing) {
      this.props.soundCloudAudio.play();
    } else {
      this.props.soundCloudAudio.stop();
    }
  }
  

  render() {
    const { trackTitle, artistName } = this.props;
    return (
      <div className="p1 mb3 mt1 flex flex-center bg-darken-1 orange rounded">
        <img className="player-album-art" src={this.props.albumArtUrl} alt={this.props.artistName} />
        
        <div className="player-track-labels">
          <h2 className="player-track-song-title-label">{trackTitle}</h2>
          <h2 className="player-track-artist-label">{artistName}</h2>
        </div>
        <PrevButton
          id="prev-button"
          className="flex-none h4 button button-transparent button-grow rounded mr2"
          icon={PrevIconSVG}
          {...this.props}
        />
        <PlayButton
          className="flex-none h4 button button-transparent button-grow rounded mr2"
          icon={PlayIconSVG}
          {...this.props} onTogglePlay={this.props.togglePlay}/>
        <NextButton
          id="next-button"
          className="flex-none h4 button button-transparent button-grow rounded mr2"
          icon={NextIconSVG}
          {...this.props}
        />

        <div className="progress-bar-container">
          <h5 className="elapsed-time-label time-label">
            {this.convertTime(this.props.currentTime)}
          </h5>
          <Progress {...this.props} />
          <h5 className="duration-label time-label">
            {this.convertTime(this.props.duration)}
          </h5>
        </div>
        <VolumeControl {...this.props} />
      </div>
    );
  }
}

AWSSoundPlayer.propTypes = {
  preloadType: PropTypes.string,
  streamUrl: PropTypes.string.isRequired,
  trackTitle: PropTypes.string.isRequired
};

AWSSoundPlayer.defaultProps = {
  preloadType: "auto"
};

export default withCustomAudio(AWSSoundPlayer);
