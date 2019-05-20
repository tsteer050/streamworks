import React from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from '../graphql/mutations';
import './Login.css';
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
        {loginUser => ( <div id="login">
          <div id="login-header">
          </div>
          <form id="login-form"
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
            <h2>To continue, login to StreamWorks.</h2>
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
           
            <button id="submit-button" type="login">LOG IN</button>
          </form>
        </div>
        )}
      </Mutation>
    );
  }
}

export default Login