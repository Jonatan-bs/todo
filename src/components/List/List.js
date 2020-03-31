import React, { Component } from "react";
import "./List.css";

class List extends Component {
  deActivate = (listID, index) => {
    return () => {
      fetch("http://localhost:4000/list/deactivate", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ listID })
      })
        .then(res => res.json())
        .then(res => {
          if (this.props.activeListIndex === index) {
            this.props.setListActive(null)();
          }
          this.props.getLists();
        })
        .catch(err => console.log(err));
    };
  };

  addList = e => {
    const newList = this.props.newList;

    fetch("http://localhost:4000/list/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newList })
    })
      .then(res => res.json())
      .then(res => {
        this.props.getLists();
        this.setState({ newList: "" });
      })
      .catch(err => console.log(err));
  };
  render = () => {
    return (
      <React.Fragment>
        <div className="inputWbutton">
          <input
            id="listName"
            type="text"
            placeholder="Add new list"
            value={this.props.newList}
            onChange={this.props.setNewListValue}
          />
          <button id="addList" onClick={this.addList}>
            Add List
          </button>
        </div>
        <ul id="listUl">
          {!this.props.lists.length ? (
            <p>Add your first list</p>
          ) : (
            this.props.lists.map((list, index) => {
              return (
                <li
                  key={index}
                  onClick={this.props.setListActive(index)}
                  className={this.props.activeListIndex ? "active" : null}
                >
                  <p>{list.title}</p>
                  <span
                    className="deActivate"
                    onClick={this.deActivate(list._id, index)}
                  >
                    <img
                      className="deActivate"
                      src="icons/x.svg"
                      alt="close icon"
                    ></img>
                  </span>
                </li>
              );
            })
          )}
        </ul>
      </React.Fragment>
    );
  };
}

export default List;
