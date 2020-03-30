import React, { Component } from "react";
// import cookie from "./cookieHandler";

import "./App.css";

class App extends Component {
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
      credentials: "same-origin",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          // cookie.createCookie("user_id", res.user._id, 9999);
          console.log(res);
        } else {
          console.log("wrong password or username");
        }
      })
      .catch(err => console.log(err));
  };

  verify = () => {
    fetch("http://localhost:4000/user/verify", {
      method: "post",

      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="signIn">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={this.setValue}
          value={this.state.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={this.setValue}
          value={this.state.password}
        />
        <button onClick={this.login}>Log in</button>
        <button onClick={this.verify}>Verify</button>
      </div>
    );
  }
}

export default App;
