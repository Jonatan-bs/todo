import React, { Component } from "react";
import "./ListsNtodos.css";
import List from "./../List/List";
import Todo from "./../Todo/Todo";
import TodoCreate from "./../Todo/Create/Create";

class ListsNtodos extends Component {
  state = {};
  render() {
    return (
      // <TodoCreate />

      <div id="listsNtodos">
        <div id="listWrap">
          <div id="list">
            <List />
          </div>
        </div>
        <div id="todoWrap">
          <Todo />
        </div>
      </div>
    );
  }
}

export default ListsNtodos;
