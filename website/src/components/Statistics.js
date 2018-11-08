import React, { Component } from 'react';
import styles from './Statistics.module.css';
import Stat from './Stat';
import Abilities from './Abilities';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
    this.processStats.bind(this);
    console.log("asdf");
    console.log(this.props.stats);
  }

  componentDidMount() {
    this.processStats(this.state.stats);
    console.log("stasadf");
    console.log(this.state.stats);
  }

  processStats(stats) {
    console.log(stats);
  }

  render() {
    const stats = this.props.stats;
    return (
      <div className={styles.statisticsWrapper}>
        <h1 className={styles.statisticsHeader}>Statistics</h1>
        <div className={styles.statWrapper}>
          <div className={styles.stats}>
            <div className={styles.statsRow1}>
              <Stat item="Health" 
                base={stats.hp[0]} 
                levelIncrease={stats.hp[1]} />
              <Stat item="Health Regen" 
                base={stats.hpRegen[0]} 
                levelIncrease={stats.hpRegen[1]} />
              <Stat item="Attack Damage" 
                base={stats.ad[0]} 
                levelIncrease={stats.ad[1]} />
            </div>
            <div className={styles.statsRow2}>
              <Stat item="Armor" 
                base={stats.armor[0]}
                levelIncrease={stats.armor[1]}/>
              <Stat item="Attack Speed" 
                base={stats.attackSpeed[0]} 
                levelIncrease={stats.attackSpeed[1]}/>
              <Stat item="Magic Resist" 
                base={stats.mr[0]} 
                levelIncrease={stats.mr[1]}/>
            </div>
            <div className={styles.statsRow4}>
              <Stat item="Movement Speed" 
                base={stats.movement[0]}
                levelIncrease={stats.movement[1]}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
