import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { FETCH_ALBUMS } from "../graphql/queries";
import "./Splash.css";
import SideBar from "../components/Sidebar";
import AudioPlayer from "./AudioPlayer";

class Splash extends React.Component {
  render() {
    return (
      <Fragment>
        <SideBar />
        <Query query={FETCH_ALBUMS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <ul id="splash">
                {data.albums.map(album => (
                  <li key={album._id}>{album.title}</li>
                ))}
              </ul>
            );
          }}
        </Query>
        <AudioPlayer />
      </Fragment>
    );
  }
}

export default Splash;
