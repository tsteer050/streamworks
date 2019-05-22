import React, { Component } from "react";
import "./searchbar.css";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="search-div">
        <div className="input-header">
          <input
            type="text"
            className="input-box"
            placeholder="Start Typing . . ."
          />
        </div>
        <section className="search-results">Results</section>
      </div>
    );
  }
}
