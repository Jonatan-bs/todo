import React, { Component } from "react";
import "./ListsNtodos.css";
import List from "./../List/List";
import Todo from "./../Todo/Todo";
import TodoCreate from "./../Todo/Create/Create";

class ListsNtodos extends Component {
  state = {};
  render() {
    return (
      <TodoCreate />

      //   <div id="ListsNtodos">
      //     <div id="list">
      //       <List />
      //     </div>
      //     <div id="todo">
      //       <Todo />
      //     </div>
      //   </div>
    );
  }
}

export default ListsNtodos;
