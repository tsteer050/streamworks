import React from "react";
import "./Profile.css";
import { FETCH_USER } from "../../graphql/queries";
import * as profile from "../../images/profile.png";
import { Link, withRouter } from "react-router-dom";
import { ApolloConsumer } from "react-apollo";
import SideBar from "../Sidebar";
import { Query } from "react-apollo";
import AudioPlayer from "../AudioPlayer";
const jwt = require("jsonwebtoken");

class Profile extends React.Component {
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
      <div className="bg-container">
        <div className="sidebar-profile">
          <SideBar />
        </div>
        <ApolloConsumer>
          {client => (
            <div className="main-bg-div">
              <div className="bg-div">
                <img src={profile} alt="profile" />
                <Query
                  query={FETCH_USER}
                  variables={{ _id: this.state.user.id }}
                >
                  {({ data, loading, error }) => {
                    if (loading) return <p>Loading...</p>;

                    if (error) return <p>error</p>;

                    return <h1 className="profile-name">{data.user.name}</h1>;
                  }}
                </Query>

                <div className="menu-links">
                  <Link to="overview">VIEW ACCOUNT</Link>
                  <Link to="/contact">CONTACT US</Link>
                  <button
                    className="logout-btn"
                    onClick={e => {
                      e.preventDefault();
                      localStorage.removeItem("auth-token");
                      client.writeData({ data: { isLoggedIn: false } });
                      this.props.history.push("/");
                    }}
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            </div>
          )}
        </ApolloConsumer>
        <AudioPlayer />
      </div>
    );
  }
}

export default withRouter(Profile);
