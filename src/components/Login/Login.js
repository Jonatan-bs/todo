import React, { Component } from "react";
import { Link } from "react-router-dom";

class login extends Component {
  state = { email: "", password: "" };

  setValue = e => {
    const state = this.state;
    const name = e.target.name;
    state[name] = e.target.value;
    this.setState(state);
  };

  login = () => {
    fetch("http://localhost:4000/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.auth) {
          this.props.updateState({
            auth: true,
            firstname: res.user.firstname,
            todos: res.user.todo
          });
        } else {
          console.log("wrong password or username");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="login" className="popup">
        <h2>Login</h2>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={this.setValue}
            value={this.state.email}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={this.setValue}
            value={this.state.password}
          />
        </div>
        <button onClick={this.login}>Log in</button>

        <Link to="/register">
          <p className="secondButton">Register</p>
        </Link>
      </div>
    );
  }
}

export default login;
