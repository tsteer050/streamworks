import React, { Component } from "react";
import { SEARCH_QUERY } from "../../graphql/queries";
import { Query } from "react-apollo";
import "./searchbar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: "" };

    this.update = this.update.bind(this);
  }

  update(e) {
    e.preventDefault();
    this.setState({ filter: e.target.value });
  }

  render() {
    return (
      <div className="search-div">
        <div className="input-header">
          <input
            onChange={this.update}
            type="text"
            className="input-box"
            placeholder="Start Typing . . ."
          />
        </div>
        <section className="search-results">
          <Query query={SEARCH_QUERY} variables={{ filter: this.state.filter }}>
            {({ data }) => {
              console.log(data);
              return null;
            }}
          </Query>
        </section>
      </div>
    );
  }
}

export default SearchBar;
