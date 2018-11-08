import React from "react";

const Header = () => {
  return (
    <nav
      className="uk-navbar-container uk-navbar-transparent uk-light"
      uk-navbar=""
    >
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <a href="/">HOME</a>
          </li>
        </ul>
      </div>

      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <a href="https://na.leagueoflegends.com/en/news/game-updates/patch/patch-822-notes">
              READ LATEST PATCH NOTES
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
