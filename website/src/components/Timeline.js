import React, { Component } from 'react';
import styles from './Timeline.module.css';
import InfoCard from './InfoCard';

class Timeline extends Component {
  render() {
    return (
      <div className={styles.timeline}>
        <div className={styles.infoCardContainer}>
          <InfoCard />
        </div>
      </div>
    );
  }
}

export default Timeline;
