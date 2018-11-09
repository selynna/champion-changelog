import React, { Component } from "react";
import styles from "./ChampionHeader.module.css";

class ChampionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { champData: this.props.champData };
    this.processData = this.processData.bind(this);
  }

  componentDidMount() {
    this.processData(this.state.champData);
  }

  processData(champData) {
    const champion = this.props.name;
    const title = champData.title;
    this.setState({ championName: champion, title: title });
  }

  render() {
    const champData = this.props.champData;
    const champImg = `https://ddragon.leagueoflegends.com/cdn/8.22.1/img/champion/${
      champData.image.full
    }`;

    const { lastPlayed, lastPlayedPatch } = this.props;
    const checkIfPlayed = date => {
      if (
        date.getDate() === 9 &&
        date.getMonth() === 10 &&
        date.getFullYear() === 2017
      ) {
        return false;
      }

      return true;
    };
    return (
      <div className={styles.championHeader}>
        <div className={styles.champion}>
          <div className={styles.championHeaderInfo}>
            <div
              className={styles.championPicture}
              style={{ backgroundImage: `url('${champImg}')` }}
            />
            <h1 className={styles.championName}>{champData.name}</h1>
            <div>
              <h2>{champData.title}</h2>
              <h4>
                {checkIfPlayed(lastPlayed)
                  ? `Last Played on ${lastPlayed.getMonth() +
                      1}/${lastPlayed.getDate()}/${lastPlayed.getFullYear()} (Patch ${lastPlayedPatch})`
                  : "You have not played this champion recently"}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionHeader;
