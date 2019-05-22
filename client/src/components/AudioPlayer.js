import React, { Component, Fragment } from "react";
import "./AudioPlayer.css";
import { Query } from "react-apollo";
import AWSSoundPlayer from "./DemoPlayer";
import { IS_LOGGED_IN } from "../graphql/queries";

import PlaceHolderPlayer from "./PlaceHolderPlayer";

const streamUrl =
  "https://s3.us-east-2.amazonaws.com/streamworks-songs/Long+Live+the+King+1.m4a";
const trackTitle = "Long Live the King";
const artistName = "Organ Freeman";

class AudioPlayer extends React.Component {
  render() {
    return (
      <Query query={IS_LOGGED_IN}>
        {({ data }) => {
          if (data.isLoggedIn) {
            return (
              <div id="audio-player-bar">
                <AWSSoundPlayer
                  id="audio-player"
                  streamUrl={streamUrl}
                  trackTitle={trackTitle}
                  artistName={artistName}
                />
              </div>
            );
          } else {
            return (
              <div id="audio-player-bar">
                <PlaceHolderPlayer />
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default AudioPlayer;
