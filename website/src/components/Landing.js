import React, { Component } from "react";
import "./Landing.css";

import Header from "./Header";

const championList = [];
class Landing extends Component {
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
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
