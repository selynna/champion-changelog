import React, { Component } from 'react';
import styles from './InfoCard.module.css';
import Statistics from './Statistics';
import Abilities from './Abilities';

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.processData.bind(this);
  }

  componentWillMount() {
    this.processData(this.props.champData);
  }

  processData(champData) {
    const p = champData.passive;
    const q = champData.spells[0];
    const w = champData.spells[1];
    const e = champData.spells[2];
    const r = champData.spells[3];

    const data = champData.stats;
    const stats = {
      hp: [data.hp, data.hpperlevel],
      hpRegen: [data.hpregen, data.hpregenperlevel],
      ad: [data.attackdamage, data.attackdamageperlevel],
      mrRegen: [data.mpregen, data.mpregenperlevel],
      attackSpeed: [data.attackspeed, data.attackspeedperlevel],
      armor: [data.armor, data.armorperlevel],
      mr: [data.spellblock, data.spellblockperlevel],
      movement: [data.movespeed, 0],
    };

    for (var stat in stats) {
      stats[stat] = [parseFloat(stats[stat][0]).toFixed(1), parseFloat(stats[stat][1]).toFixed(1)];
    }

    const abilities = [p, q, w, e, r];
    this.setState({ abilities: abilities, stats: stats });
  }

  render() {
    return (
      <div className={styles.infoCardWrapper}>
        <div className={styles.infoCard}>
          <Statistics stats={this.state.stats} />
          <Abilities abilities={this.state.abilities} />
        </div>
      </div>
    );
  }
}

export default InfoCard;
