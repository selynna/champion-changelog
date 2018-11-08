import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Stat.module.css';

const Stat = ({ item, base, levelIncrease }) => (
  <div className={styles.statWrapper}>
    <div className={styles.statItemHeader}>
      <div className={styles.statChangeIcon}></div>
      <p className={styles.statItem}>{item}:</p>
    </div>
    <p className={styles.levelChange}>{base} (+{levelIncrease} per level)</p>
  </div>
);

Stat.propTypes = {
  item: PropTypes.string,
  base: PropTypes.string,
  levelIncrease: PropTypes.string,
}

export default Stat;
