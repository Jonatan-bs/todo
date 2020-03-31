import React, { Component } from "react";
import "./ListsNtodos.css";
import List from "./../List/List";
import Todo from "./../Todo/Todo";

let debounce = (func, delay) => {
  let debounceTimer;
  return () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func();
    }, delay);
  };
};

class ListsNtodos extends Component {
  state = { activeListIndex: null, lists: [], inactiveLists: [], newList: "" };

  setListActive = index => {
    return e => {
      if (e && e.target.classList.contains("deActivate")) return;
      this.setState({ activeListIndex: index });
    };
  };
  componentDidMount() {
    this.getLists();
  }

  getLists = () => {
    fetch("http://localhost:4000/list/retrieve", {
      method: "post"
    })
      .then(res => res.json())
      .then(res => {
        if (res.list) {
          let lists = res.list.filter(list => list.active === true);
          let inactiveLists = res.list.filter(list => list.active === false);
          this.setState({ lists, inactiveLists });
        } else {
          console.log("Server error");
        }
      })
      .catch(err => console.log(err));
  };
  setNewListValue = e => {
    const newList = e.target.value;
    this.setState({ newList });
  };

  updateListDebounce = debounce(e => {
    let { lists, activeListIndex } = this.state;
    let listID = lists[activeListIndex]._id;
    let title = lists[activeListIndex].title;

    if (!listID) return;
    fetch("http://localhost:4000/list/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ listID, title })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }, 400);

  setNewListTitle = e => {
    let { lists, activeListIndex } = this.state;
    lists = [...lists];
    lists[activeListIndex].title = e.target.value;
    this.setState({ lists });
    this.updateListDebounce();
  };
  render() {
    return (
      <React.Fragment>
        <div id="listsNtodos">
          <div id="listWrap">
            <div id="list">
              <List
                setListActive={this.setListActive}
                activeListIndex={this.state.activeListIndex}
                lists={this.state.lists}
                inactiveLists={this.state.inactiveLists}
                getLists={this.getLists}
                newList={this.state.newList}
                setNewListValue={this.setNewListValue}
              />
            </div>
          </div>
          <div id="todoWrap">
            <Todo
              activeListIndex={this.state.activeListIndex}
              lists={this.state.lists}
              newList={this.state.newList}
              setNewListValue={this.setNewListValue}
              activeList={this.state.lists[this.state.activeListIndex]}
              setNewListTitle={this.setNewListTitle}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListsNtodos;
