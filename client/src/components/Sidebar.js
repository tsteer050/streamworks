import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';
import { IS_LOGGED_IN } from '../graphql/queries';
import { Query, ApolloConsumer } from 'react-apollo';

class Sidebar extends React.Component {

  render() {

    return (
     
      <div id="sidebar-container">  
        <div id="sidebar">
          <div id="logo">LOGO</div>
          <ApolloConsumer>
            { client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              // if we have some one logged in we show them a logout button
              if (data.isLoggedIn) {
                return <button
                  onClick={e => {
                    e.preventDefault();
                    localStorage.removeItem("auth-token");
                    client.writeData({ data: { isLoggedIn: false } });
                    this.props.history.push("/");
                  }}
                >
                  Logout
                </button>
              } else {
                return (
                  <div id="sidebar-footer">
                    <p id="signup"><Link to="/signup">SIGN UP</Link></p>
                    <p id="login" ><Link to="/login">LOG IN</Link></p>
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
};

export default Sidebar;