import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { IS_LOGGED_IN } from "../graphql/queries";
import AudioPlayer from "./AudioPlayer";
import PlaceHolderPlayer from "./PlaceHolderPlayer";

export default class LoggedPlayer extends Component {
  render() {
    return (
      <Fragment>
        <Query query={IS_LOGGED_IN}>
          {({ data }) => {
            if (data.isLoggedIn) {
              return <AudioPlayer />;
            } else {
              return <PlaceHolderPlayer />;
            }
          }}
        </Query>
      </Fragment>
    );
  }
}
