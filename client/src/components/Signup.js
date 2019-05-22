import React from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { CREATE_USER } from "../graphql/mutations";
import "./Signup.css";
import * as logo from "../images/icons8-spotify-filled-100.png";

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

  loginDemoUser() {}

  updateCache(client, { data }) {
    console.log(data);
    // here we can write directly to our cache with our returned mutation data
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {createUser => (
          <div id="signup">
            <div className="signup-header">
              <Link to="/">
                <img src={logo} alt="icon" />
                <h1>StreamWorks</h1>
              </Link>
            </div>
            {/* <div className="demo-div">
              <div className="demo-btn-div">
                <button onClick={this.loginDemoUser} className="demo-btn">
                  DEMO LOGIN
                </button>
                <div className="borders">
                  <span className="left-border" />
                  <strong className="line-through">or</strong>
                  <span className="left-border" />
                </div>
              </div>
            </div> */}
            <form
              id="signup-form"
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
              <h2>Sign up for a new account</h2>
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
              <input
                type="text"
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="What should we call you?"
              />

              <button id="submit-button" type="signup">
                Sign Up
              </button>
            </form>
            <div className="account-login">
              <p>Already have an account?</p>
              <Link className="login-link" to="/login">
                Log In
              </Link>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;

// < div id = "birthdate-picker" >

//   <select id="enter-birthdate" onChange={this.update("birthmonth")}>
//     <option value="January">January</option>
//     <option value="February">February</option>
//     <option value="March">March</option>
//     <option value="April">April</option>
//   </select>
//   <input
//     type="text"
//     value={this.state.birthday}
//     onChange={this.update("birthday")}
//     placeholder="Day"
//   />
//   <input
//     type="text"
//     value={this.state.birthyear}
//     onChange={this.update("birthyear")}
//     placeholder="Year"
//   />
//             </div >
// <div id="gender">
//   <input className="radio-button" type="radio" name="gender" value="male" /> Male
//             <input className="radio-button" type="radio" name="gender" value="female" /> Female
//             <input className="radio-button" type="radio" name="gender" value="non-binary" /> Non-binary
//             </div>
