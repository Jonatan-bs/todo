import React, { Component } from "react";
import "./Editor.css";

class TodoEditor extends Component {
  state = {
    todo: {
      title: "",
      description: "",
      priority: 0,
      deadlineDate: "",
      deadlineTime: "",
    },
    message: "",
  };

  componentDidMount = () => {
    if (!this.props.activeTodo) return;

    let { activeTodo } = this.props;

    if (activeTodo.deadlineDate) {
      let dateObj = new Date(activeTodo.deadlineDate);
      var d = ("0" + dateObj.getDate()).slice(-2);
      var m = ("0" + (dateObj.getMonth() + 1)).slice(-2);

      var y = dateObj.getFullYear();
      activeTodo.deadlineDate = y + "-" + m + "-" + d;
    }

    let todo = {
      title: activeTodo.title,
      description: activeTodo.description,
      priority: activeTodo.priority,
      deadlineDate: activeTodo.deadlineDate ? activeTodo.deadlineDate : "",
      deadlineTime: activeTodo.deadlineTime,
    };
    this.setState({ todo });
  };

  getValue = (e) => {
    const todo = { ...this.state.todo };
    const val = e.target.value;
    const name = e.target.name;
    todo[name] = val;
    this.setState({ todo });
  };

  setValPrio = (e) => {
    const todo = { ...this.state.todo };
    const value = e.target.value;
    todo.priority = Number(value);
    this.setState({ todo });
  };
  updateTodo = () => {
    const todo = this.state.todo;
    const todoID = this.props.activeTodo._id;
    fetch("http://localhost:3000/todo/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo, todoID }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          this.props.setTodos(res.todo);
          this.props.todoPop(false)();
        }
      })
      .catch((err) => console.log(err));
  };
  deleteTodo = () => {
    const todoID = this.props.activeTodo._id;
    fetch("http://localhost:3000/todo/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todoID }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          this.props.setTodos(res.todo);
          this.props.todoPop(false)();
        }
      })
      .catch((err) => console.log(err));
  };
  addTodo = () => {
    let popup = document.querySelector(".popup");
    let inputs = popup.querySelectorAll("input");
    for (const input of inputs) {
      input.reportValidity();
      if (!input.checkValidity()) return;
    }

    const todo = this.state.todo;
    fetch("http://localhost:3000/todo/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        if (res.success) {
          this.props.setTodos(res.todo);
          this.props.todoPop(false)();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="overlay" onClick={this.props.todoPop(false)}></div>
        <div id="createTodo" className="popup">
          <div className="field">
            <label htmlFor="todoTitle">Title</label>
            <input
              id="todoTitle"
              type="text"
              name="title"
              value={this.state.todo.title}
              onChange={this.getValue}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="todoDescription">Description</label>
            <textarea
              className="editable"
              id="todoDescription"
              type="text"
              name="description"
              value={this.state.todo.description}
              onChange={this.getValue}
            ></textarea>
          </div>
          <div className="field ">
            <p>Priority</p>
            <div className="priority">
              <input
                id="prio1"
                name="todoPriority"
                type="radio"
                value="0"
                checked={this.state.todo.priority === 0}
                onChange={this.setValPrio}
              />
              <label htmlFor="prio1"></label>

              <input
                id="prio2"
                name="todoPriority"
                type="radio"
                value="1"
                checked={this.state.todo.priority === 1}
                onChange={this.setValPrio}
              />
              <label htmlFor="prio2"></label>

              <input
                id="prio3"
                name="todoPriority"
                type="radio"
                value="2"
                checked={this.state.todo.priority === 2}
                onChange={this.setValPrio}
              />
              <label htmlFor="prio3"></label>

              <input
                id="prio4"
                name="todoPriority"
                type="radio"
                value="3"
                checked={this.state.todo.priority === 3}
                onChange={this.setValPrio}
              />
              <label htmlFor="prio4"></label>
            </div>
          </div>

          <p>Deadline</p>

          <div className="field dateTime">
            <div className="date">
              <label htmlFor="todoDeadLine">Date</label>
              <input
                id="todoDeadLine"
                type="date"
                name="deadlineDate"
                value={this.state.todo.deadlineDate}
                onChange={this.getValue}
              />
            </div>
            <div className="time">
              <label htmlFor="todoDeadLineTime">Time</label>
              <input
                id="todoDeadLine"
                name="deadlineTime"
                type="time"
                value={this.state.todo.deadlineTime}
                onChange={this.getValue}
              />
            </div>
          </div>
          {this.props.action === "create" ? (
            <button id="addTodo" onClick={this.addTodo}>
              Add todo
            </button>
          ) : null}
          {this.props.action === "edit" ? (
            <React.Fragment>
              <button id="editTodo" onClick={this.updateTodo}>
                Update todo
              </button>
              <button id="deleteTodo" onClick={this.deleteTodo}>
                Delete todo
              </button>
            </React.Fragment>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default TodoEditor;
