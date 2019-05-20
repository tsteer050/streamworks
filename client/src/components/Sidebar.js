import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { IS_LOGGED_IN } from "../graphql/queries";
import { Query, ApolloConsumer } from "react-apollo";
import * as logo from "../images/spotify.png";
import * as home from "../images/home.jpg";
import * as search from "../images/search.png";
import * as library from "../images/library.png";
import * as profile from "../images/profile.png";

class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar-container">
        <div id="sidebar">
          <div id="logo">
            <Link to="/featured">
              <img className="str-logo" src={logo} alt="spotify-logo" />
              <h3 className="str-header">StreamWorks</h3>
            </Link>
          </div>
          <div>
            <div className="align-div">
              <Link to="/featured">
                <img className="home-logo" src={home} alt="home" />
                <h5 className="home-link">Home</h5>
              </Link>
            </div>
            <div className="align-div">
              <Link to="/search">
                <img className="search-logo" src={search} alt="search" />
                <h5>Search</h5>
              </Link>
            </div>
            <div className="align-div">
              <Link to="/playlists">
                <img className="library-logo" src={library} alt="library" />
                <h5>Your Library</h5>
              </Link>
            </div>
          </div>
          <ApolloConsumer>
            {client => (
              <Query query={IS_LOGGED_IN}>
                {({ data }) => {
                  // if we have some one logged in we show them a logout button
                  if (data.isLoggedIn) {
                    return (
                      <Fragment>
                        <button
                          onClick={e => {
                            e.preventDefault();
                            localStorage.removeItem("auth-token");
                            client.writeData({ data: { isLoggedIn: false } });
                            this.props.history.push("/");
                          }}
                        >
                          Logout
                        </button>
                        <div className="account-footer">
                          <div className="footer-icon">
                            <Link to="/account">
                              <img
                                className="profile-icon"
                                src={profile}
                                alt="profile"
                              />
                              <h5>Account Name</h5>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  } else {
                    return (
                      <div id="sidebar-footer">
                        <p id="signup">
                          <Link to="/signup">SIGN UP</Link>
                        </p>
                        <p id="login-p">
                          <Link to="/login">LOG IN</Link>
                        </p>
                      </div>
                    );
                  }
                }}
              </Query>
            )}
          </ApolloConsumer>
        </div>
      </div>
    );
  }
}

export default Sidebar;
