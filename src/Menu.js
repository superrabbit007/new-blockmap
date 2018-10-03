import React, { Component } from "react";
import "./App.css";

class Menu extends Component {
  showNav() {
    this.props.navChange();
  }

  render() {
    return (
      <div id="menu">
        <button
          className="navbar-toggle"
          type="button"
          data-toggle="collapse"
          data-target=".bs-navbar-collapse"
          onClick={() => this.showNav()}
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
    );
  }
}

export default Menu;
