import React, { Component } from 'react';
import styles from './Statistics.module.css';
import Stat from './Stat';

class Statistics extends Component {
  render() {
    return (
      <div className={styles.statisticsWrapper}>
        <h1>Statistics</h1>
        <Stat item="Health" base="550" levelIncrease="+85"/>
      </div>
    );
  }
}

export default Statistics;
