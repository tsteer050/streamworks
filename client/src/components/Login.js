import React from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../graphql/mutations";
import { Link } from "react-router-dom";
import "./Login.css";
import * as logo from "../images/icons8-spotify-filled-100.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    // here we can write directly to our cache with our returned mutation data
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => (
          <div id="login">
            <div className="login-header">
              <Link to="/">
                <img src={logo} alt="icon" />
                <h1>StreamWorks</h1>
              </Link>
            </div>
            <div className="demo-div">
              <div className="demo-btn-div">
                <button
                  onClick={e => {
                    e.preventDefault();
                    loginUser({
                      variables: {
                        email: "demo@demo.com",
                        password: "123456"
                      }
                    });
                  }}
                  className="demo-btn"
                >
                  DEMO LOGIN
                </button>
                <div className="borders">
                  <span className="left-border" />
                  <strong className="line-through">or</strong>
                  <span className="left-border" />
                </div>
              </div>
            </div>
            <form
              id="login-form"
              onSubmit={e => {
                e.preventDefault();
                loginUser({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <h3>To continue, login to StreamWorks.</h3>
              <input
                type="email"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />

              <button id="submit-button" type="login">
                LOG IN
              </button>
            </form>
            <div className="bottom-border-div">
              <div className="bottom-border" />
            </div>
            <div className="signup-div">
              <h5>Don't have an account?</h5>
              <Link to="/signup">SIGN UP FOR STREAMWORKS</Link>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Login;
