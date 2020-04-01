import React, { Component } from "react";
import "./ListsNtodos.css";
import List from "./../List/List";
import Todo from "./../Todo/Todo";
import handler from "./../handler";

class ListsNtodos extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div id="listsNtodos">
          {/* <div id="listWrap">
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
          </div> */}
          <div id="todoWrap">
            <Todo />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ListsNtodos;
