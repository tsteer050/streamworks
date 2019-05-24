import React, { Component } from "react";
import { SEARCH_QUERY, FETCH_ALBUMS } from "../../graphql/queries";
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
          {this.state.filter ? (
            <Query
              query={SEARCH_QUERY}
              variables={{ filter: this.state.filter }}
            >
              {({ loading, error, data }) => {
                console.log("data", data);
                if (loading) return <div className="loading-screen" />;
                if (error) return `Error! ${error.message}`;

                let songs = data.search.filter(
                  result => result.__typename === "SongType"
                );
                return (
                  <ul className="result-list">
                    {songs.map(song => {
                      if (song.title) {
                        return <li>{song.title}</li>;
                      }
                    })}
                  </ul>
                );
              }}
            </Query>
          ) : null}
        </section>
      </div>
    );
  }
}

export default SearchBar;
