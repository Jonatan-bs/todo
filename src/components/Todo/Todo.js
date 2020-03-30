import React, { Component } from "react";
import "./Todo.css";

class List extends Component {
  state = {
    todos: []
  };
  render() {
    return (
      <React.Fragment>
        <ul>
          <li>
            <p>Placeholder</p>
            <span>X</span>
          </li>
          <li>
            <p>Placeholder</p>
            <span>X</span>
          </li>
          <li>
            <p>Placeholder</p>
            <span>X</span>
          </li>
          <li>
            <p>Placeholder</p>
            <span>X</span>
          </li>
          <li>
            <p>Placeholder</p>
            <span>X</span>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default List;
