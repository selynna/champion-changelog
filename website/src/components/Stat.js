import React, { Component } from 'react';
import styles from './Stat.module.css';

class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      base: this.props.base,
      levelIncrease: this.props.levelIncrease,
      buff: this.props.buff
    }
    this.processBuff = this.processBuff.bind(this);
  }

  componentDidMount() {
    this.processBuff(this.state.buff);
  }

  processBuff(buff) {
    let isBuff = false;
    let isNerf = false;
    let noChange = false;

    if (this.state.buff === "buff") {
      isBuff = true;
      isNerf = false;
      noChange = false;
    } else if (this.state.buff === "nerf") {
      isBuff = false;
      isNerf = true;
      noChange = false;
    } else {
      isBuff = false;
      isNerf = false;
      noChange = true;
    }

    this.setState({ isBuff: isBuff, isNerf: isNerf, noChange: noChange });
  }

  render() {
    const item = this.state.item;
    const base = this.state.base;
    const levelIncrease = this.state.levelIncrease;

    const isBuff = this.state.isBuff;
    const isNerf = this.state.isNerf;

    let icon;
    
    if (isBuff) {
      icon = <div className={styles.statUpIcon}></div>;
    } else if (isNerf) {
      icon = <div className={styles.statDownIcon}></div>;
    } else {
      icon = <div className={styles.statNoChangeIcon}></div>;
    }

    return (
      <div className={styles.statWrapper}>
        <div className={styles.statItemHeader}>
          
          {icon} 
          <p className={styles.statItem}>{item}:</p>
        </div>
        <p className={styles.levelChange}>{base} (+{levelIncrease} per level)</p>
      </div>
    );
  }
}

export default Stat;
