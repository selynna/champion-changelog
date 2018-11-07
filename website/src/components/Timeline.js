import React, { Component } from 'react';
import './App.css';
import styles from './Timeline.module.css';

class Timeline extends Component {
  render() {
    return (
      <div className={styles.timeline}>
        <h1>Akali</h1>
        <h2>The Rogue Assassin</h2>
      </div>
    );
  }
}

export default Timeline;
