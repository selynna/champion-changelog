import React, { Component } from 'react';
import styles from './ChampionHeader.module.css';

class ChampionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { champData: this.props.champData };
    this.processData.bind(this);
  }

  componentDidMount() {
    this.processData(this.state.champData);
  }

  processData(champData) {
    console.log(champData);

    {/* Champion data - name, title */}
    const champion = this.props.name;
    const title = champData.title;
    this.setState({ championName: champion, title: title });
  }

  render() {
    const champData = this.props.champData;
    console.log(champData);

    return (
      <div className={styles.championHeader}>
        <div className={styles.champion}>
          <div className={styles.championHeaderInfo}>
            <div className={styles.championPicture}></div>
            <h1>{this.state.championName}</h1>
            <h2>{this.state.title}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionHeader;
