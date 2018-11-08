import React, { Component } from 'react';
import styles from './Timeline.module.css';
import InfoCard from './InfoCard';
import ChampionHeader from './ChampionHeader';
import HorizontalTimelineContent from 'react-horizontal-timeline';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: 0, 
      previous: 0, 
      patches: [
        ['11/07/2018', 'Patch 8.22'],
        ['11/06/2017', 'Patch 8.21'],
        ['11/05/2016', 'Patch 8.20'],
        ['11/04/2015', 'Patch 8.19'],
      ],
      stylesBackground: '#f8f8f8',
      stylesForeground: '#7b9d6f',
      stylesOutline: '#dfdfdf',
    };
  }

  render() {
    const patches = this.state.patches;
    return (
      <div className={styles.timeline}>
        <div className={styles.info}>
          <div className={styles.championHeaderWrapper}>
            <div className={styles.tmp}>
              <ChampionHeader />
            </div>
          </div>
          <div className={styles.infoCardContainer}>
            <InfoCard />
          </div>
        </div>
        <div className={styles.timelineWrapper}>
          <HorizontalTimelineContent 
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}
            styles={{
              background: this.state.stylesBackground,
              foreground: this.state.stylesForeground,
              outline: this.state.stylesOutline
            }}
            values={patches}/>
        </div>
      </div>
    );
  }
}

export default Timeline;
