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
          <div id="signup-header">
          </div>
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
              
              <button id="submit-button" type="signup">Sign Up</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup

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