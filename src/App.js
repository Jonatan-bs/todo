import React, { Component } from "react";

import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateTodo from "./components/Todo/Editor/Editor";
import ListsNtodos from "./components/ListsNtodos/ListsNtodos";
import TopMenu from "./components/TopMenu/TopMenu";
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
    this.setState({ auth: state, user: {}, todos: [] });
  };
  componentDidMount() {
    fetch("http://localhost:4000/user/auth", { method: "post" })
      .then(res => res.json())
      .then(res => {
        this.setState({
          firstname: res.user.firstname,
          todos: res.user.todo,
          auth: res.auth
        });
      })
      .catch(err => console.log(err));
  }

  MainPage = () => {
    return (
      <React.Fragment>
        <header>
          <TopMenu firstname={this.state.firstname} />
        </header>
        <section>
          <Todo todos={this.state.todos} setTodos={this.setTodos.bind(this)} />
        </section>
      </React.Fragment>
    );
  };

  setTodos = newTodos => {
    handler.sort(newTodos, "updatedAt", "desc");
    handler.sort(newTodos, "done", "asc");
    this.setState({ todos: newTodos });
  };

  render() {
    return this.state.auth === "notset" ? (
      <p>Loading</p>
    ) : (
      <Router>
        <Switch>
          {/* <Route
            exact
            path="/login"
            render={() => (this.state.auth ? <Redirect to="/" /> : <Login />)}
          />
          <Route
            exact
            path="/register"
            render={() =>
              this.state.auth ? <Redirect to="/" /> : <Register />
            }
          />

          <Route
            exact
            render={() =>
              this.state.auth ? <this.MainPage /> : <Redirect to="/login" />
            }
          /> */}

          <this.MainPage />

          <Route component={this.MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
