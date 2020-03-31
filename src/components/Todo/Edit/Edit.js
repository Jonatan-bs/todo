import React, { Component } from "react";
import "./Edit.css";

class TodoPopup extends Component {
  state = {
    todo: {
      title: "",
      description: "",
      priority: 0,
      deadlineDate: "",
      deadlineTime: ""
    }
  };

  getValue = e => {
    const todo = { ...this.state.todo };
    const val = e.target.value;
    const name = e.target.name;
    todo[name] = val;
    this.setState({ todo });
  };

  setValPrio = e => {
    const todo = { ...this.state.todo };
    const value = e.target.value;
    todo.priority = Number(value);
    this.setState({ todo });
  };

  addTodo = () => {
    const todo = this.state.todo;
    const listID = this.props.listID;
    fetch("http://localhost:4000/todo/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo, listID })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.setTodos();
          this.props.todoPop(false)();
        }
      })
      .catch(err => console.log(err));
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
            />
          </div>
          <div className="field">
            <label htmlFor="todoDescription">Description</label>
            <textarea
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
          <button id="addList" onClick={this.addTodo}>
            Add todo
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default TodoPopup;
