import React, { Component } from "react";
import "./Todo.css";
import TodoEditor from "./Editor/Editor";
import handler from "./../handler";

class Todos extends Component {
  render() {
    return this.props.todos.map((todo, index) => {
      return (
        <React.Fragment key={index}>
          <p className="updateDate">
            {"Updated: " + handler.formatDate(todo.updatedAt)}
          </p>
          <li key={index} onClick={this.props.todoPop("edit", todo)}>
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
  state = { todoPop: false, todos: [], activeTodo: null };

  // getAcvtiveList = attr => {
  //   let index = this.props.activeListIndex;
  //   if (!index && index !== 0) return false;

  //   switch (attr) {
  //     case "id":
  //       return this.props.lists[index]._id;
  //     case "title":
  //       return this.props.lists[index].title;
  //     default:
  //       return false;
  //   }
  // };

  // setTodos = () => {
  //   const listID = this.getAcvtiveList("id");
  //   if (!listID) return;
  //   fetch("http://localhost:4000/todo/retrieve", {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ listID })
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.todo) {
  //         res.todo.forEach(todo => {
  //           if (todo.deadlineDate) {
  //             let dateObj = new Date(todo.deadlineDate);
  //             var d = dateObj.getDate();
  //             var m = dateObj.getMonth() + 1;
  //             var y = dateObj.getFullYear();
  //             todo.deadlineDate = d + "/" + m + "/" + y;
  //           }
  //         });
  //         let todos = res.todo.filter(todo => todo.done === false);
  //         let inactiveTodos = res.todo.filter(todo => todo.done === true);

  //         let allTodos = res.todo;
  //         handler.sort(allTodos, "done", "asc");

  //         this.setState({ todos, inactiveTodos, allTodos });
  //       } else {
  //         console.log("Server error");
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

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
  componentDidMount() {
    this.setState({ todos: this.props.todos });
  }
  componentDidUpdate = prevProps => {
    if (prevProps === this.props) return;
    this.setState({ todos: this.props.todos });
  };

  todoPop = (show, todo) => {
    return e => {
      if (e && e.target.classList.contains("nopop")) return;
      // let activeTodo = todo ? todo : null;
      else this.setState({ todoPop: show, activeTodo: todo });
    };
  };

  // ActiveTodos = () => {
  //   return this.state.todos.map((todo, index) => {
  //     return (
  //       <li key={index} onClick={this.todoPop("edit", todo)}>
  //         <div className="done" onClick={this.doneEvent(todo._id)}>
  //           <input className="nopop" id="done" type="checkbox" />
  //           <label className="nopop" htmlFor="done"></label>
  //         </div>
  //         <span className={"priority priority" + todo.priority}></span>
  //         <div className="content">
  //           <p className="title">{todo.title}</p>
  //           <p className="description">{todo.description}</p>
  //         </div>
  //         <div className="deadline">
  //           <p className="date">{todo.deadlineDate}</p>
  //           <p className="time">{todo.deadlineTime}</p>
  //         </div>
  //       </li>
  //     );
  //   });
  // };

  // InctiveTodos = () => {
  //   return this.state.inactiveTodos.map((todo, index) => {
  //     return (
  //       <li key={index} onClick={this.todoPop("edit", todo)}>
  //         <div className="done" onClick={this.doneEvent(todo._id)}>
  //           <input className="nopop" id="done" type="checkbox" defaultChecked />
  //           <label className="nopop" htmlFor="done"></label>
  //         </div>
  //         <span className={"priority priority" + todo.priority}></span>
  //         <div className="content">
  //           <p className="title">{todo.title}</p>
  //           <p className="description">{todo.description}</p>
  //         </div>
  //         <div className="deadline">
  //           <p className="date">{todo.deadlineDate}</p>
  //           <p className="time">{todo.deadlineTime}</p>
  //         </div>
  //       </li>
  //     );
  //   });
  // };

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

        <button id="addTodo" onClick={this.todoPop("create")}>
          Add todo
        </button>
        <ul id="todoUl">
          {this.state.todos.length > 0 ? (
            <Todos
              todos={this.state.todos}
              todoPop={this.todoPop}
              doneEvent={this.doneEvent}
            />
          ) : (
            <p>Add your first Todo</p>
          )}
        </ul>
      </React.Fragment>
    );
  };
}

export default Todo;
