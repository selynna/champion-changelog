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
    console.log(champData);

    const champion = this.props.name;
    const title = champData.title;
    this.setState({ championName: champion, title: title });
  }

  render() {
    const champData = this.props.champData;
    const champImg = `https://ddragon.leagueoflegends.com/cdn/8.22.1/img/champion/${
      champData.image.full
    }`;

    return (
      <div className={styles.championHeader}>
        <div className={styles.champion}>
          <div className={styles.championHeaderInfo}>
            <div
              className={styles.championPicture}
              style={{ backgroundImage: `url('${champImg}')` }}
            />
            <h1>{champData.name}</h1>
            <h2>{champData.title}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionHeader;
