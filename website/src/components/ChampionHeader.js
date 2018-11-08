import React, { Component } from 'react';
import styles from './ChampionHeader.module.css';

class ChampionHeader extends Component {
  render() {
    return (
      <div className={styles.championHeader}>
        <div className={styles.champion}>
          <div className={styles.championHeaderInfo}>
            <div className={styles.championPicture}></div>
            <h1>Akali</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionHeader;
