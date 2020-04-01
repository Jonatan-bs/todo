import React, { Component } from "react";

import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Todo from "./components/Todo/Todo";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import handler from "./components/handler";

class App extends Component {
  state = { auth: "notset" };

  setAuth = state => {
    this.setState({ auth: state, todos: [], firstname: "" });
  };
  componentDidMount() {
    fetch("http://localhost:4000/user/auth", { method: "post" })
      .then(res => res.json())
      .then(res => {
        let auth = res.auth;
        // let auth = false;
        let firstname = "";
        let todos = [];
        if (res.user) {
          firstname = res.user.firstname;
          todos = res.user.todo;
        }

        this.setState({ auth, firstname, todos });
      })
      .catch(err => console.log(err));
  }

  MainPage = () => {
    return (
      <React.Fragment>
        <section>
          <Todo todos={this.state.todos} setTodos={this.setTodos.bind(this)} />
        </section>
      </React.Fragment>
    );
  };
  setName = firstname => {
    this.setState({ firstname: firstname });
  };
  updateState = obj => {
    this.setState(obj);
  };
  setTodos = newTodos => {
    handler.sort(newTodos, "updatedAt", "desc");
    handler.sort(newTodos, "done", "asc");
    console.log("222", this);
    this.setState({ todos: newTodos });
  };

  render() {
    return this.state.auth === "notset" ? (
      <p>Loading</p>
    ) : (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              this.state.auth ? (
                <Redirect to="/" />
              ) : (
                <Login updateState={this.updateState.bind(this)} />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={() =>
              this.state.auth ? (
                <Redirect to="/" />
              ) : (
                <Register updateState={this.updateState.bind(this)} />
              )
            }
          />

          <Route
            exact
            render={() =>
              this.state.auth ? <this.MainPage /> : <Redirect to="/login" />
            }
          />

          {/* <this.MainPage /> */}

          <Route component={this.MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
