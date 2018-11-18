import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      champ: null,
      name: ""
    };

    // this.submit = this.submit.bind(this);
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

  render() {
    return (
      <div className="landing">
        <div className="landing-container">
          <Navbar />

          <div className="landing-title-container">
            <h1 className="landing-title">CHAMPION CHANGELOG</h1>
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
                <Link
                  to={
                    this.state.champ && this.state.name.length > 0
                      ? `/timeline/${this.state.name}/${this.state.champ.id}`
                      : "/"
                  }
                  style={{ textDecoration: "none", color: "White", textAlign: "center", lineHeight: "50px" }}
                  className="submit-button"
                >
                  Submit
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
