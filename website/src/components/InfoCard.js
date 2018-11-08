import React, { Component } from 'react';
import styles from './InfoCard.module.css';
import Statistics from './Statistics';
import ChampionHeader from './ChampionHeader';

class InfoCard extends Component {
  render() {
    return (
      <div className={styles.infoCardWrapper}>
        <ChampionHeader />
        <div className={styles.infoCard}>
          <Statistics />
        </div>
      </div>
    );
  }
}

export default InfoCard;
