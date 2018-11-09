import React, { Component } from 'react';
import styles from './Statistics.module.css';
import Stat from './Stat';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = { stats: this.props.stats };
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
                levelIncrease={stats.hp[1]}
                buff={stats.hp[2]} />
              <Stat item="Health Regen" 
                base={stats.hpRegen[0]} 
                levelIncrease={stats.hpRegen[1]}
                buff={stats.hpRegen[2]} />
              <Stat item="Attack Damage" 
                base={stats.ad[0]} 
                levelIncrease={stats.ad[1]}
                buff={stats.ad[2]} />
            </div>
            <div className={styles.statsRow2}>
              <Stat item="Armor" 
                base={stats.armor[0]}
                levelIncrease={stats.armor[1]}/>
                buff={stats.armor[2]} />
              <Stat item="Attack Speed" 
                base={stats.attackSpeed[0]} 
                levelIncrease={stats.attackSpeed[1]}/>
                buff={stats.attackSpeed[2]} />
              <Stat item="Magic Resist" 
                base={stats.mr[0]} 
                levelIncrease={stats.mr[1]}/>
                buff={stats.mr[2]} />
            </div>
            <div className={styles.statsRow4}>
              <Stat item="Movement Speed" 
                base={stats.movement[0]}
                levelIncrease={stats.movement[1]}
                buff={stats.movement[2]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
