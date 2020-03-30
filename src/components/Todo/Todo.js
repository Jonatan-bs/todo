import React, { Component } from "react";

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
