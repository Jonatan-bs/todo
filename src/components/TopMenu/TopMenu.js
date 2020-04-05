import React, { Component } from "react";
import "./TopMenu.css";

class TopMenu extends Component {
  state = {};
  logout = () => {
    fetch("http://localhost:3000/user/logout", {
      method: "post",
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        this.props.setAuth(false);
      })
      .catch((err) => console.log(err));
  };
  render = () => {
    return (
      <div id="topMenu">
        <div id="addTodoWrap">
          <div id="addTodo">
            <img
              className="addButton"
              src={require("./../../icons/x.svg")}
              alt="Add todo"
              onClick={this.props.todoPop("create")}
            ></img>
          </div>
          {this.props.todos.length ? null : (
            <div id="addFirst">
              <img src={require("./arrow.svg")} alt="Add todo"></img>
            </div>
          )}
        </div>
        <p id="logout" onClick={this.logout}>
          Log out
        </p>
      </div>
    );
  };
}

export default TopMenu;
