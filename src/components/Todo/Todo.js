import React, { Component } from "react";
import "./Todo.css";
import TodoEditor from "./Editor/Editor";
import TopMenu from "./../TopMenu/TopMenu";
import handler from "./../handler";

class Todos extends Component {
  render() {
    return this.props.type.map((todo, index) => {
      return (
        <React.Fragment key={index}>
          <div className="topElms">
            <p className="updateDate">
              {this.props.changePrefix +
                ": " +
                handler.formatDate(todo.updatedAt)}
            </p>
            {this.props.changePrefix === "Updated" ? (
              <p className="drop" onClick={this.props.dropEvent(todo._id)}>
                Drop
              </p>
            ) : null}
            {this.props.changePrefix === "Done" ? (
              <p className="drop" onClick={this.props.dropEvent(todo._id)}>
                Drop
              </p>
            ) : null}
            {this.props.changePrefix === "Dropped" ? (
              <p className="drop" onClick={this.props.dropEvent(todo._id)}>
                Reset
              </p>
            ) : null}
          </div>
          <li
            key={index}
            onClick={
              this.props.changePrefix === "Updated"
                ? this.props.todoPop("edit", todo)
                : null
            }
          >
            {todo.deadlineDate || todo.deadlineTime ? (
              <div className="deadline">
                <img
                  src={require("./../../icons/clock.svg")}
                  alt="Deadline"
                ></img>

                <p className="date">{handler.formatDate(todo.deadlineDate)}</p>
                <p className="time">{todo.deadlineTime}</p>
              </div>
            ) : null}
            {this.props.changePrefix !== "Dropped" ? (
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
                >
                  <img
                    alt="checked"
                    className="nopop"
                    src={require("./../../icons/checked.svg")}
                    onClick={this.props.doneEvent(todo._id)}
                  />
                </label>
              </div>
            ) : null}

            <span className={"priority priority" + todo.priority}></span>
            <div className="content">
              <h3 className="title">{todo.title}</h3>
              <p className="description">{todo.description}</p>
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
    done: [],
  };

  doneEvent = (todoID) => {
    return (e) => {
      if (e.target !== e.currentTarget) return;

      fetch("http://localhost:3000/todo/done", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoID }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.props.setTodos(res.todo);
        })
        .catch((err) => console.log(err));
    };
  };

  dropEvent = (todoID) => {
    return (e) => {
      if (e.target !== e.currentTarget) return;

      fetch("http://localhost:3000/todo/drop", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoID }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.props.setTodos(res.todo);
        })
        .catch((err) => console.log(err));
    };
  };
  componentDidMount() {
    let { todos } = this.props;
    let active = todos.filter((x) => x.done === false && x.dropped === false);
    let dropped = todos.filter((x) => x.dropped);
    let done = todos.filter((x) => x.done);
    this.setState({ todos, done, dropped, active });
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps === this.props) return;
    let { todos } = this.props;
    let active = todos.filter((x) => x.done === false && x.dropped === false);
    let dropped = todos.filter((x) => x.dropped);
    let done = todos.filter((x) => x.done);
    this.setState({ todos, done, dropped, active });
  };

  todoPop = (show, todo) => {
    return (e) => {
      if (e && e.target.classList.contains("nopop")) return;
      // let activeTodo = todo ? todo : null;
      else this.setState({ todoPop: show, activeTodo: todo });
    };
  };

  render = () => {
    return (
      <React.Fragment>
        <TopMenu
          setAuth={this.props.setAuth}
          todoPop={this.todoPop}
          todos={this.state.todos}
        />
        {this.state.todoPop ? (
          <TodoEditor
            todoPop={this.todoPop}
            setTodos={this.props.setTodos}
            action={this.state.todoPop}
            activeTodo={this.state.activeTodo}
          />
        ) : null}

        {/* <div id="addTodo">
          <img
            src={require("./../../icons/x.svg")}
            alt="Add todo"
            onClick={this.todoPop("create")}
          ></img>
        </div> */}

        {this.state.todos.length > 0 ? (
          <div id="todoWrap">
            {this.state.active.length > 0 ? (
              <div className="activeTodos todoSection">
                <ul className="todoUl">
                  <h4 className="todoGroupTitle">Active Todos</h4>
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
                  <h4 className="todoGroupTitle">Done</h4>
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
                  <h4 className="todoGroupTitle">Dropped</h4>
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
          <div className="welcome" onClick={this.todoPop("create")}>
            <h1>Welcome to</h1>

            <img src={require("./../../logo.svg")} alt="Deadline"></img>
            <p>
              Add your first Todo, in the top left corner <br /> or click HERE{" "}
            </p>
          </div>
        )}
      </React.Fragment>
    );
  };
}

export default Todo;
