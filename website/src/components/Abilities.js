import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Abilities.module.css';

const Abilities = ({ item, base, levelIncrease }) => (
  <div className={styles.abilitiesWrapper}>
    <h1 className={styles.abilitiesHeader}>Abilities</h1>
    <div className={styles.abilityIcons}>
      <div className={styles.abilityP}></div>
      <div className={styles.vline}></div>
      <div className={styles.abilityQ}></div>
      <div className={styles.abilityW}></div>
      <div className={styles.abilityE}></div>
      <div className={styles.abilityR}></div>
    </div>
    <div className={styles.ability}>
      <div className={styles.abilityName}>
        <p>Five Point Strike</p>
      </div>
      <div className={styles.costrange}>
        <div className={styles.cost}>
          <div className={styles.costChangeIcon}></div>
          <p>Cost: 100/95/90/85/80 mana</p>
        </div>
        <div className={styles.range}>
          <div className={styles.rangeChangeIcon}></div>
          <p>Range: 550</p>
        </div>
      </div>
      <div className={styles.abilityDesc}>
        <p>akali does some cool shit and here's some filler text</p>
      </div>
    </div>
  </div>
);

Abilities.propTypes = {
  item: PropTypes.string,
  base: PropTypes.string,
  levelIncrease: PropTypes.string,
}

export default Abilities;
