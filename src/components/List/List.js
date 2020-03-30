import React, { Component } from "react";
import "./List.css";

class List extends Component {
  state = {
    lists: [
      { name: "first" },
      { name: "second" },
      { name: "third" },
      { name: "fouth" }
    ]
  };
  render = () => {
    return (
      <React.Fragment>
        <ul>
          {this.state.lists.map((list, index) => {
            return (
              <li key={index}>
                <p>{list.name}</p>
                <span>X</span>
              </li>
            );
          })}
        </ul>
        <label htmlFor="addList">Add List</label>
        <div className="inputWbutton">
          <input id="listName" type="text" />
          <button id="addList">Add List</button>
        </div>
      </React.Fragment>
    );
  };
}

export default List;
