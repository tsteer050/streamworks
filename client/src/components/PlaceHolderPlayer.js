import React, { Fragment } from "react";
import * as prev from "../images/previous.png";
import * as play from "../images/play.png";
import { VolumeControl, Progress } from "react-soundplayer/components";
import "./placeholder.css";
import Rodal from "rodal";
import "rodal/lib/rodal.css";

class PlaceHolderPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Fragment>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
          <div>Content</div>
        </Rodal>
        <div className="p1 mb3 mt1 flex flex-center bg-darken-1 orange rounded">
          <div className="track-icons">
            <img
              onClick={this.show.bind(this)}
              className="prev-icon"
              src={prev}
              alt="prev-button"
            />
            <img
              onClick={this.show.bind(this)}
              className="play-icon"
              src={play}
              alt="play-button"
            />
            <img
              onClick={this.show.bind(this)}
              className="next-icon"
              src={prev}
              alt="next-button"
            />
          </div>
          <div className="progress-bar-container">
            <h5 className="elapsed-time-label time-label">
              {/* {this.convertTime(this.props.currentTime)} */}
            </h5>
            <Progress />
            <h5 className="duration-label time-label">
              {/* {this.convertTime(this.props.duration)} */}
            </h5>
          </div>
          <VolumeControl />
        </div>
      </Fragment>
    );
  }
}

export default PlaceHolderPlayer;
