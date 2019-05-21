import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCustomAudio } from 'react-soundplayer/addons';
import { PlayButton, PrevButton, NextButton, Progress, VolumeControl, Timer } from 'react-soundplayer/components';


const seekingIcon = (
  <img src="./assets/preloader.svg" className="sb-soundplayer-icon" />
);

class AWSSoundPlayer extends Component {

  constructor() {
    super();
    this.state = {
      seeking: false,
      playing: false,
      currentTime: 0,
      progressVal: 0,
      duration: 316,
      volume: 0.75,
      isMuted: false
    };
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
    this.seekTrack = this.seekTrack.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }

  

  handleClick() {
    let { playing } = this.state;

    if (!playing) {
      this.setState({ seeking: true });
      setTimeout(() => {
        this.setState({ seeking: false, playing: !!!this.state.playing });
      }, 1500);
      withCustomAudio.play();
    } else {
      this.setState({ playing: !!!this.state.playing });
      withCustomAudio.pause();
    }
    console.log(this.state);
  }

  handleVolumeChange(volume) {
    this.setState({ volume });
  }

  handleMuteToggle(isMuted) {
    this.setState({ isMuted });
  }

  seekTrack(xPos) {
    this.setState({
      currentTime: Math.round(xPos * this.state.duration),
      progressVal: Math.round(xPos * 100)
    });
  }

  render() {
    const { trackTitle } = this.props;
    let { playing, seeking, duration, currentTime, progressVal } = this.state;

    return (
      <div className="p1 mb3 mt1 flex flex-center bg-darken-1 orange rounded">
        <div className="center-controls">
          <div className="left-track-info">
            <h2 className="h5 nowrap caps flex-auto m0">{trackTitle}</h2>
          </div>
          <div className="center-top-controls">
            <PrevButton
              className='prevbutton'
              {...this.props} />
            <PlayButton
              className="flex-none h4 button button-transparent button-grow rounded mr2"
              playing={playing}
              seeking={seeking}
              seekingIcon={seekingIcon}
              onTogglePlay={this.handleClick}
              />
            <NextButton
              className='nextbutton'
              {...this.props} />
            
          </div>
          <Progress
            className='track-progress'
            innerClassName='track-progress-bar'
            value={progressVal}
            onSeekTrack={this.seekTrack} />
        </div>
        <Timer 
        className="h6 mr1" 
        duration={duration}
        currentTime={currentTime}
        {...this.props} />

        <VolumeControl
          className='volume-control'
          buttonClassName='volume-control-button'
          rangeClassName='volume-control-range'
          volume={this.state.volume}
          isMuted={this.state.isMuted}
          onVolumeChange={this.handleVolumeChange}
          onToggleMute={this.handleMuteToggle} />
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
  preloadType: 'auto'
};

export default withCustomAudio(AWSSoundPlayer);