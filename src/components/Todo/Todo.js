import React, { Component } from "react";
import "./Todo.css";
import TodoEditor from "./Editor/Editor";
import handler from "./../handler";
import cross from "./../../icons/x.svg";

class Todos extends Component {
  render() {
    return this.props.type.map((todo, index) => {
      return (
        <React.Fragment key={index}>
          <p className="updateDate">
            {this.props.changePrefix +
              ": " +
              handler.formatDate(todo.updatedAt)}
          </p>
          <li
            key={index}
            onClick={
              this.props.changePrefix === "Updated"
                ? this.props.todoPop("edit", todo)
                : null
            }
          >
            <div className="done">
              <input
                className="nopop"
                id="done"
                type="checkbox"
                checked={todo.done}
                readOnly
              />
              <label
                className="nopop"
                htmlFor="done"
                onClick={this.props.doneEvent(todo._id)}
              ></label>
            </div>
            <div className="drop">
              <input
                className="nopop"
                id="done"
                type="checkbox"
                checked={todo.done}
                readOnly
              />
              <label
                className="nopop"
                htmlFor="drop"
                onClick={this.props.dropEvent(todo._id)}
              ></label>
            </div>
            <span className={"priority priority" + todo.priority}></span>
            <div className="content">
              <h3 className="title">{todo.title}</h3>
              <p className="description">{todo.description}</p>
            </div>
            <div className="deadline">
              <p className="date">{handler.formatDate(todo.deadlineDate)}</p>
              <p className="time">{todo.deadlineTime}</p>
            </div>
          </li>
        </React.Fragment>
      );
    });
  }
}

class Todo extends Component {
  state = {
    todoPop: false,
    todos: [],
    activeTodo: null,
    active: [],
    dropped: [],
    done: []
  };

  doneEvent = todoID => {
    return e => {
      if (e.target !== e.currentTarget) return;

      fetch("http://localhost:4000/todo/done", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todoID })
      })
        .then(res => res.json())
        .then(res => {
          this.props.setTodos(res.todo);
        })
        .catch(err => console.log(err));
    };
  };

  dropEvent = todoID => {
    return e => {
      if (e.target !== e.currentTarget) return;

      fetch("http://localhost:4000/todo/drop", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todoID })
      })
        .then(res => res.json())
        .then(res => {
          this.props.setTodos(res.todo);
        })
        .catch(err => console.log(err));
    };
  };
  componentDidMount() {
    let { todos } = this.props;
    let active = todos.filter(x => x.done === false && x.dropped === false);
    let dropped = todos.filter(x => x.dropped);
    let done = todos.filter(x => x.done);

    this.setState({ todos, done, dropped, active });
  }
  componentDidUpdate = prevProps => {
    if (prevProps === this.props) return;
    let { todos } = this.props;
    let active = todos.filter(x => x.done === false && x.dropped === false);
    let dropped = todos.filter(x => x.dropped);
    let done = todos.filter(x => x.done);
    this.setState({ todos, done, dropped, active });
  };

  todoPop = (show, todo) => {
    return e => {
      if (e && e.target.classList.contains("nopop")) return;
      // let activeTodo = todo ? todo : null;
      else this.setState({ todoPop: show, activeTodo: todo });
    };
  };

  render = () => {
    return (
      <React.Fragment>
        {this.state.todoPop ? (
          <TodoEditor
            todoPop={this.todoPop}
            setTodos={this.props.setTodos}
            action={this.state.todoPop}
            activeTodo={this.state.activeTodo}
          />
        ) : null}

        <div id="addTodo" onClick={this.todoPop("create")}>
          <img src={require("./../../icons/x.svg")} alt="Add todo"></img>
        </div>

        {this.state.todos.length > 0 ? (
          <div id="todoWrap">
            {this.state.active.length > 0 ? (
              <div className="activeTodos todoSection">
                <ul className="todoUl">
                  <Todos
                    type={this.state.active}
                    todoPop={this.todoPop}
                    doneEvent={this.doneEvent}
                    dropEvent={this.dropEvent}
                    changePrefix="Updated"
                  />
                </ul>
              </div>
            ) : null}
            {this.state.done.length > 0 ? (
              <div className="doneTodos todoSection">
                <ul className="todoUl">
                  <Todos
                    type={this.state.done}
                    todoPop={this.todoPop}
                    doneEvent={this.doneEvent}
                    dropEvent={this.dropEvent}
                    changePrefix="Done"
                  />
                </ul>
              </div>
            ) : null}
            {this.state.dropped.length > 0 ? (
              <div className="droppedTodos todoSection">
                <ul className="todoUl">
                  <Todos
                    type={this.state.dropped}
                    todoPop={this.todoPop}
                    doneEvent={this.doneEvent}
                    dropEvent={this.dropEvent}
                    changePrefix="Dropped"
                  />
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <p>Add your first Todo</p>
        )}
      </React.Fragment>
    );
  };
}

export default Todo;
