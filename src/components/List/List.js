import React, { Component } from "react";
import "./List.css";

class List extends Component {
  state = {
    newList: "",
    lists: [
      { name: "first" },
      { name: "second" },
      { name: "third" },
      { name: "fouth" }
    ]
  };
  setValue = e => {
    const newList = e.target.value;
    this.setState({ newList });
  };
  addList = e => {
    const newList = e.target.Value;

    fetch("http://localhost:4000/list/create", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ title: newList })
    });
  };
  render = () => {
    return (
      <React.Fragment>
        <div className="inputWbutton">
          <input
            id="listName"
            type="text"
            placeholder="Add new list"
            value={this.state.newList}
            onChange={this.setValue}
          />
          <button id="addList" onChange={this.addList}>
            Add List
          </button>
        </div>
        <ul id="listUl">
          {this.state.lists.map((list, index) => {
            return (
              <li key={index}>
                <p>{list.name}</p>
                <span>
                  <img src="icons/x.svg" alt="close icon"></img>
                </span>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  };
}

export default List;
