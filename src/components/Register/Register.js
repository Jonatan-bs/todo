import React, { Component } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

class Register extends Component {
  state = { email: "", password: "", firstname: "", lastname: "", message: "" };

  setValue = e => {
    const state = this.state;
    const name = e.target.name;
    state[name] = e.target.value;
    this.setState(state);
  };

  register = () => {
    let popup = document.querySelector(".popup");
    let inputs = popup.querySelectorAll("input");
    for (const input of inputs) {
      input.reportValidity();
      if (!input.checkValidity()) return;
    }
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
        if (res.code === 11000) {
          this.setState({ message: "wrong username or password" });
          setTimeout(() => {
            this.setState({ message: "" });
          }, 2000);
        } else {
          this.props.updateState({
            auth: true,
            todos: res.user.todo
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="register" className="popup">
        <div className={this.state.message ? "message active" : "message"}>
          User already exist
        </div>

        <h1>Register</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={this.setValue}
          value={this.state.email}
          required
        />

        <label htmlFor="firstname">firstname</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          onChange={this.setValue}
          value={this.state.firstname}
          required
        />

        <label htmlFor="lastname">lastname</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={this.setValue}
          value={this.state.lastname}
          required
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={this.setValue}
          value={this.state.password}
          required
        />
        <button onClick={this.register}>Register</button>
        <Link to="/login">
          <p className="secondButton">Login</p>
        </Link>
      </div>
    );
  }
}

export default Register;
