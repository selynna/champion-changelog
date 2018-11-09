import React, { Component } from "react";
import styles from "./InfoCard.module.css";
import Statistics from "./Statistics";
import Abilities from "./Abilities";

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.processData.bind(this);
  }

  componentWillMount() {
    this.processData(this.props.champData, this.props.bsd);
  }

  processData(champData, bsd) {
    const p = champData.passive;
    const q = champData.spells[0];
    const w = champData.spells[1];
    const e = champData.spells[2];
    const r = champData.spells[3];

    const data = champData.stats;
    const stats = {
      hp: [data.hp, data.hpperlevel, bsd.hp.statChange],
      hpRegen: [data.hpregen, data.hpregenperlevel, bsd.hpregen.statChange],
      ad: [data.attackdamage, data.attackdamageperlevel, bsd.attackdamage.statChange],
      mrRegen: [data.mpregen, data.mpregenperlevel, bsd.mpregen.statChange],
      attackSpeed: [data.attackspeed, data.attackspeedperlevel, bsd.attackspeedperlevel.statChange],
      armor: [data.armor, data.armorperlevel, bsd.armor.statChange],
      mr: [data.spellblock, data.spellblockperlevel, bsd.spellblock.statChange],
      movement: [data.movespeed, 0, bsd.movespeed.statChange]
    };

    for (var stat in stats) {
      let buff = "buff";
      if (stats[stat][2] === 0) {
        buff = "nochange";
      } else if (stats[stat][2] < 0) {
        buff = "nerf";
      }
      var num = parseFloat(stats[stat][0]).toFixed(1);
      var numPL = parseFloat(stats[stat][1]).toFixed(1);

      if (num.endsWith(".0")) {
        num = num.substring(0, num.length - 2);
      }
      if (numPL.endsWith(".0")) {
        numPL = numPL.substring(0, numPL.length - 2);
      }
      stats[stat] = [ num, numPL, buff ];
    }

    const abilities = [p, q, w, e, r];
    this.setState({ abilities: abilities, stats: stats });
  }

  render() {
    return (
      <div className={styles.infoCardWrapper}>
        <div className={styles.infoCard}>
          <Statistics stats={this.state.stats} />
          {/* <Abilities abilities={this.state.abilities} /> */}
          <Abilities
            abilities={this.state.abilities}
            partype={this.props.champData.partype}
          />
        </div>
      </div>
    );
  }
}

export default InfoCard;
