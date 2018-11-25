import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className="landing-nav">
      <a href="/">Champion Changelog</a>
      <a
        className={styles.navbarEnd}
        href="https://na.leagueoflegends.com/en/news/game-updates/patch/patch-822-notes"
      >
        Read Latest Patch Notes
      </a>
    </nav>
  );
};

export default Navbar;
