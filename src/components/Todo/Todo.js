import React, { Component } from "react";
import "./Todo.css";
import TodoCreate from "./../Todo/Create/Create";
// import TodoEdit from "./../Todo/Edit/Edit";

class Todo extends Component {
  state = {
    todos: [],
    todoPop: false,
    inactiveTodos: [],
    activeTodo: null
  };

  getAcvtiveList = attr => {
    let index = this.props.activeListIndex;
    if (!index && index !== 0) return false;

    switch (attr) {
      case "id":
        return this.props.lists[index]._id;
      case "title":
        return this.props.lists[index].title;
      default:
        return false;
    }
  };

  setTodos = () => {
    const listID = this.getAcvtiveList("id");
    if (!listID) return;
    fetch("http://localhost:4000/todo/retrieve", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ listID })
    })
      .then(res => res.json())
      .then(res => {
        if (res.todo) {
          res.todo.forEach(todo => {
            if (todo.deadlineDate) {
              let dateObj = new Date(todo.deadlineDate);
              var d = dateObj.getDate();
              var m = dateObj.getMonth() + 1;
              var y = dateObj.getFullYear();
              todo.deadlineDate = d + "/" + m + "/" + y;
            }
          });
          let todos = res.todo.filter(todo => todo.done === false);
          let inactiveTodos = res.todo.filter(todo => todo.done === true);
          this.setState({ todos, inactiveTodos });
        } else {
          console.log("Server error");
        }
      })
      .catch(err => console.log(err));
  };

  doneEvent = todoID => {
    return () => {
      const listID = this.getAcvtiveList("id");
      if (!listID) return;
      fetch("http://localhost:4000/todo/done", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ listID, todoID })
      })
        .then(res => res.json())
        .then(res => {
          let todos = res.todo.filter(todo => todo.done === false);
          let inactiveTodos = res.todo.filter(todo => todo.done === true);
          this.setState({ todos, inactiveTodos });
        })
        .catch(err => console.log(err));
    };
  };

  componentDidUpdate = prevProps => {
    if (prevProps === this.props) return;
    this.setTodos();
  };

  todoPop = (show, todo) => {
    return e => {
      if (e && e.target.classList.contains("done")) return;
      let activeTodo = todo ? todo : null;
      this.setState({ todoPop: show, activeTodo });
    };
  };

  render() {
    return (
      <React.Fragment>
        {this.state.todoPop ? (
          <TodoCreate
            listID={this.getAcvtiveList("id")}
            todoPop={this.todoPop}
            setTodos={this.setTodos}
            action={this.state.todoPop}
            activeTodo={this.state.activeTodo}
          />
        ) : null}
        {!this.props.activeList ? null : (
          <React.Fragment>
            <input
              id="listName"
              type="text"
              placeholder="Add new list"
              value={this.props.activeList.title}
              onChange={this.props.setNewListTitle}
            />
            <button id="addTodo" onClick={this.todoPop("create")}>
              Add todo
            </button>
            <ul id="todoUl">
              {this.state.todos.map((todo, index) => {
                return (
                  <li key={index} onClick={this.todoPop("edit", todo)}>
                    <div className="done" onClick={this.doneEvent(todo._id)}>
                      <label htmlFor="done"></label>
                      <input id="done" type="checkbox" />
                    </div>
                    <span
                      className={"priority priority" + todo.priority}
                    ></span>
                    <div className="content">
                      <p className="title">{todo.title}</p>
                      <p className="description">{todo.description}</p>
                    </div>
                    <div className="deadline">
                      <p className="date">{todo.deadlineDate}</p>
                      <p className="time">{todo.deadlineTime}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Todo;
