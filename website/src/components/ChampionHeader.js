import React, { Component } from 'react';
import styles from './ChampionHeader.module.css';

class ChampionHeader extends Component {
  render() {
    return (
      <div className={styles.championHeader}>
        <div className={styles.champion}>
          <h1>Akali</h1>
          <h2>The Rogue Assassin</h2>
        </div>
        <div className={styles.championPicture}></div>
      </div>
    );
  }
}

export default ChampionHeader;
