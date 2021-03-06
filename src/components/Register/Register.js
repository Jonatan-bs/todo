import React, { Component } from "react";
import "./Register.css";
class Register extends Component {
  state = { email: "", password: "", firstname: "", lastname: "" };

  setValue = e => {
    const state = this.state;
    const name = e.target.name;
    state[name] = e.target.value;
    this.setState(state);
  };

  register = () => {
    fetch("http://localhost:4000/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="register" className="popup">
        <h1>Register</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={this.setValue}
          value={this.state.email}
        />

        <label htmlFor="firstname">firstname</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          onChange={this.setValue}
          value={this.state.firstname}
        />

        <label htmlFor="lastname">lastname</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={this.setValue}
          value={this.state.lastname}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={this.setValue}
          value={this.state.password}
        />
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default Register;
