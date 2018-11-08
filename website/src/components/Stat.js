import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Stat.module.css';

const Stat = ({ item, base, levelIncrease }) => (
  <div className={styles.statWrapper}>
    <p>{item}:</p>
    <p>{base} ({levelIncrease} per level)</p>
  </div>
);

Stat.propTypes = {
  item: PropTypes.string,
  base: PropTypes.string,
  levelIncrease: PropTypes.string,
}

export default Stat;
