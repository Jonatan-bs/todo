import React, { Component } from "react";
import "./TopMenu.css";

class TopMenu extends Component {
  state = {};
  logout = () => {
    fetch("http://localhost:4000/user/logout", {
      method: "post"
    })
      .then(res => {
        res.json();
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  render = () => {
    return (
      <div id="topMenu">
        <button id="logout" onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  };
}

export default TopMenu;
