import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_USER } from '../graphql/mutations';
import './Signup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
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
        mutation={CREATE_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {createUser => (
          <div id="signup">
            <form id="signup-form"
              onSubmit={e => {
                e.preventDefault();
                createUser({
                  variables: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <input
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Username"
              />
              <input
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
              <button type="signup">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup