import React, { Component } from 'react';
import styles from './Statistics.module.css';
import Stat from './Stat';
import Abilities from './Abilities';

class Statistics extends Component {
  render() {
    return (
      <div className={styles.statisticsWrapper}>
        <h1 className={styles.statisticsHeader}>Statistics</h1>
        <div className={styles.statWrapper}>
          <div className={styles.stats}>
            <div className={styles.statsRow1}>
              <Stat item="Health" base="550" levelIncrease="+85"/>
              <Stat item="Health Regen" base="3.5" levelIncrease="+0.5"/>
              <Stat item="Attack Damage" base="62.4" levelIncrease="+3.3"/>
            </div>
            <div className={styles.statsRow2}>
              <Stat item="Armor" base="23" levelIncrease="+3.5"/>
              <Stat item="Attack Speed" base="NaN" levelIncrease="+3.2%"/>
              <Stat item="Magic Resist" base="32.1" levelIncrease="+1.25"/>
            </div>
            <div className={styles.statsRow4}>
              <Stat item="Movement Speed" base="345" levelIncrease="+0"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
