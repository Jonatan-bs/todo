import React, { Component } from "react";

import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CreateTodo from "./components/Todo/Create/Create";
import ListsNtodos from "./components/ListsNtodos/ListsNtodos";
import TopMenu from "./components/TopMenu/TopMenu";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <header>
          <TopMenu />
        </header>
        <section>
          <ListsNtodos />
        </section>
      </React.Fragment>
    );
  }
}

export default App;
