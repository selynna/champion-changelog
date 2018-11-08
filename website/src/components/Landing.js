import React, { Component } from "react";
import "./Landing.css";

import SearchBar from "./SearchBar";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      champ: null,
      name: ""
    };

    this.submit = this.submit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleChampChange = this.handleChampChange.bind(this);
  }

  handleNameChange(event) {
    var searchQuery = event.target.value;
    this.setState({ name: searchQuery });
  }

  handleChampChange(champ) {
    this.setState({ champ });
  }

  submit() {
    fetch(
      `http://localhost:4000/api/lastplayed/${this.state.name}/${
        this.state.champ.id
      }`
    )
      .then(response => response.json())
      .then(data => console.log(data));
  }
  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          <nav className="landing-nav">
            <a href="/">Patch Review</a>
            <a
              className="landing-nav-end"
              href="https://na.leagueoflegends.com/en/news/game-updates/patch/patch-822-notes"
            >
              Read Latest Patch Notes
            </a>
          </nav>

          <div className="landing-title-container">
            <h1 className="landing-title">PATCH REVIEW</h1>
            <p className="landing-subtitle">
              Find changes to your champs since you last played
            </p>

            <div className="search-container">
              <SearchBar onChangeChamp={this.handleChampChange} />
              <h1 className="landing-plus">+</h1>
              <div className="search-names">
                <input
                  className="search-name-field"
                  type="text"
                  placeholder="In-game Name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                />
              </div>
              <button className="submit-button" onClick={this.submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
