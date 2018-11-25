import React, { Component } from "react";
import styles from "./Abilities.module.css";

const STATIC_URL = "https://ddragon.leagueoflegends.com/cdn/8.22.1/img";

class Abilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currAbility: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();

    const clickedClass = e.target.className.split("_")[1];
    let currAbility;

    if (clickedClass === "abilityP") {
      currAbility = 0;
    } else if (clickedClass === "abilityQ") {
      currAbility = 1;
    } else if (clickedClass === "abilityW") {
      currAbility = 2;
    } else if (clickedClass === "abilityE") {
      currAbility = 3;
    } else if (clickedClass === "abilityR") {
      currAbility = 4;
    }

    this.setState({ currAbility });
  }

  render() {
    const { abilities } = this.props;
    const { currAbility } = this.state;

    const ability = abilities[currAbility];
    return (
      <div className={styles.abilitiesWrapper}>
        <h1 className={styles.abilitiesHeader}>Abilities</h1>
        <div className={styles.abilityIcons}>
          <div
            className={
              currAbility === 0
                ? `${styles.abilityP} ${styles.abilityBorder}`
                : `${styles.abilityP}`
            }
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('${STATIC_URL}/passive/${
                abilities[0].image.full
              }')`
            }}
          />
          <div className={styles.vline} />
          <div
            className={
              currAbility === 1
                ? `${styles.abilityQ} ${styles.abilityBorder}`
                : `${styles.abilityQ}`
            }
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('${STATIC_URL}/spell/${
                abilities[1].image.full
              }')`
            }}
          />
          <div
            className={
              currAbility === 2
                ? `${styles.abilityW} ${styles.abilityBorder}`
                : `${styles.abilityW}`
            }
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('${STATIC_URL}/spell/${
                abilities[2].image.full
              }')`
            }}
          />
          <div
            className={
              currAbility === 3
                ? `${styles.abilityE} ${styles.abilityBorder}`
                : `${styles.abilityE}`
            }
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('${STATIC_URL}/spell/${
                abilities[3].image.full
              }')`
            }}
          />
          <div
            className={
              currAbility === 4
                ? `${styles.abilityR} ${styles.abilityBorder}`
                : `${styles.abilityR}`
            }
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('${STATIC_URL}/spell/${
                abilities[4].image.full
              }')`
            }}
          />
        </div>
        <div className={styles.ability}>
          <div className={styles.abilityName}>
            <p>{ability.name}</p>
          </div>
          {currAbility !== 0 ? (
            <div className={styles.costrange}>
              <div className={styles.cost}>
                <div className={styles.costChangeIcon} />
                <p>{`Cost: ${ability.costBurn} ${this.props.partype}`}</p>
              </div>
              <div className={styles.range}>
                <div className={styles.rangeChangeIcon} />
                <p>Range: {ability.rangeBurn}</p>
              </div>
            </div>
          ) : null}
          <div className={styles.abilityDesc}>
            <p>{ability.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Abilities;
