import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Abilities.module.css";

class Abilities extends Component {
  render() {
    const { passive, spells } = this.props;
    return (
      <div className={styles.abilitiesWrapper}>
        <h1 className={styles.abilitiesHeader}>Abilities</h1>
        <div className={styles.abilityIcons}>
          <div
            className={styles.abilityP}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/passive/${
                passive.image.full
              }')`
            }}
          />
          <div className={styles.vline} />
          <div
            className={styles.abilityQ}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                spells[0].image.full
              }')`
            }}
          />
          <div
            className={styles.abilityW}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                spells[1].image.full
              }')`
            }}
          />
          <div
            className={styles.abilityE}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                spells[2].image.full
              }')`
            }}
          />
          <div
            className={styles.abilityR}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                spells[3].image.full
              }')`
            }}
          />
        </div>
        <div className={styles.ability}>
          <div className={styles.abilityName}>
            <p>Five Point Strike</p>
          </div>
          <div className={styles.costrange}>
            <div className={styles.cost}>
              <div className={styles.costChangeIcon} />
              <p>Cost: 100/95/90/85/80 mana</p>
            </div>
            <div className={styles.range}>
              <div className={styles.rangeChangeIcon} />
              <p>Range: 550</p>
            </div>
          </div>
          <div className={styles.abilityDesc}>
            <p>akali does some cool shit and here's some filler text</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Abilities;
