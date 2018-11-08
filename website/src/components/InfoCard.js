import React, { Component } from 'react';
import styles from './InfoCard.module.css';
import Statistics from './Statistics';
import Abilities from './Abilities';

class InfoCard extends Component {
  render() {
    return (
      <div className={styles.infoCardWrapper}>
        <div className={styles.infoCard}>
          <Statistics />
          <Abilities />
        </div>
      </div>
    );
  }
}

export default InfoCard;
