import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Sidebar.css";
import { IS_LOGGED_IN, FETCH_USER } from "../graphql/queries";
import { Query, ApolloConsumer } from "react-apollo";
import * as logo from "../images/spotify.png";
import * as home from "../images/home.jpg";
import * as search from "../images/search.png";
import * as library from "../images/library.png";
import * as profile from "../images/profile.png";
import Rodal from "rodal";
import Modal from "./Modal";
const jwt = require("jsonwebtoken");

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("auth-token");

    const user = jwt.decode(token);
    this.setState({ user });
  }

  render() {
    if (!this.state.user) return null;
    return (
      <Fragment>
        <div className="account-footer">
          <div className="footer-icon">
            <Link to="/account">
              <img className="profile-icon" src={profile} alt="profile" />
              <Query query={FETCH_USER} variables={{ _id: this.state.user.id }}>
                {({ data, loading, error }) => {
                  if (loading) return <p>Loading...</p>;

                  if (error) return <p>error</p>;

                  return <h5>{data.user.name}</h5>;
                }}
              </Query>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

class Sidebar extends React.Component {
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

  // componentDidMount() {
  //   let token = localStorage.getItem("auth-token");

  //   const user = jwt.decode(token);
  //   this.setState({ user });
  // }

  render() {
    // if (!this.state.user) return null;

    return (
      <Fragment>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
          <Modal />
        </Rodal>
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
                  <h6 className="home-link">Home</h6>
                </Link>
              </div>
              <div className="align-div">
                <Link to="/search">
                  <img className="search-logo" src={search} alt="search" />
                  <h6>Search</h6>
                </Link>
              </div>
              <div className="align-div">
                <Query query={IS_LOGGED_IN}>
                  {({ data }) => {
                    if (data.isLoggedIn) {
                      return (
                        <Link to="/library">
                          <img
                            className="library-logo"
                            src={library}
                            alt="library"
                          />
                          <h6>Your Library</h6>
                        </Link>
                      );
                    } else {
                      return (
                        <Link to="#!">
                          <img
                            onClick={this.show.bind(this)}
                            className="library-logo"
                            src={library}
                            alt="library"
                          />
                          <h6 onClick={this.show.bind(this)}>Your Library</h6>
                        </Link>
                      );
                    }
                  }}
                </Query>
              </div>
            </div>
          </div>
          <ApolloConsumer>
            {client => (
              <Query query={IS_LOGGED_IN}>
                {({ data }) => {
                  // if we have some one logged in we show them a logout button
                  if (data.isLoggedIn) {
                    // debugger;
                    return (
                      <LoggedIn client={client} history={this.props.history} />
                    );
                  } else {
                    return (
                      <div id="sidebar-footer">
                        <p className="signup">
                          <Link to="/signup">SIGN UP</Link>
                        </p>
                        <p className="login-p">
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
      </Fragment>
    );
  }
}

export default withRouter(Sidebar);
