import React, { Component } from "react";

import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import ListsNtodos from "./components/ListsNtodos/ListsNtodos";

class App extends Component {
  state = {};

  render() {
    return (
      <section>
        <ListsNtodos />
      </section>
    );
  }
}

export default App;
