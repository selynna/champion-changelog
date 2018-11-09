import React, { Component } from "react";
import styles from "./Abilities.module.css";

class Abilities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilities: this.props.abilities,
      currAbility: 0,
      togglePassive: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();

    const clickedClass = e.target.className.split("_")[1];

    if (clickedClass === "abilityP") {
      this.setState({
        abilities: this.state.abilities,
        currAbility: 0,
        togglePassive: true
      });
    } else if (clickedClass === "abilityQ") {
      this.setState({
        abilities: this.state.abilities,
        currAbility: 1,
        togglePassive: false
      });
    } else if (clickedClass === "abilityW") {
      this.setState({
        abilities: this.state.abilities,
        currAbility: 2,
        togglePassive: false
      });
    } else if (clickedClass === "abilityE") {
      this.setState({
        abilities: this.state.abilities,
        currAbility: 3,
        togglePassive: false

      });
    } else if (clickedClass === "abilityR") {
      this.setState({
        abilities: this.state.abilities,
        currAbility: 4,
        togglePassive: false
      });
    }
  }

  render() {
    // const { passive, spells } = this.props;
    const togglePassive = this.state.togglePassive;
    const abilities = this.state.abilities;
    const ability = abilities[this.state.currAbility];
    return (
      <div className={styles.abilitiesWrapper}>
        <h1 className={styles.abilitiesHeader}>Abilities</h1>
        <div className={styles.abilityIcons}>
          <div
            className={ this.state.currAbility === 0 ? `${styles.abilityP} ${styles.abilityBorder}` : `${styles.abilityP}`}
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/passive/${
                abilities[0].image.full
              }')`
            }}
          />
          <div className={styles.vline} />
          <div
            className={ this.state.currAbility === 1 ? `${styles.abilityQ} ${styles.abilityBorder}` : `${styles.abilityQ}`}
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                abilities[1].image.full
              }')`
            }}
          />
          <div
            className={ this.state.currAbility === 2 ? `${styles.abilityW} ${styles.abilityBorder}` : `${styles.abilityW}`}
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                abilities[2].image.full
              }')`
            }}
          />
          <div
            className={ this.state.currAbility === 3 ? `${styles.abilityE} ${styles.abilityBorder}` : `${styles.abilityE}`}
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                abilities[3].image.full
              }')`
            }}
          />
          <div
            className={ this.state.currAbility === 4 ? `${styles.abilityR} ${styles.abilityBorder}` : `${styles.abilityR}`}
            onClick={this.handleClick}
            style={{
              backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/spell/${
                abilities[4].image.full
              }')`
            }}
          />
        </div>
        <div className={styles.ability}>
          <div className={styles.abilityName}>
            <p>{ability.name}</p>
          </div>
          {!togglePassive && (
            <div className={styles.costrange}>
              <div className={styles.cost}>
                <div className={styles.costChangeIcon} />
                <p>
                  {/* Cost: {ability.costBurn} {ability.costType} */}
                  {`Cost: ${ability.costBurn} ${this.props.partype}`}
                </p>
              </div>
              <div className={styles.range}>
                <div className={styles.rangeChangeIcon} />
                <p>Range: {ability.rangeBurn}</p>
              </div>
            </div>
          )}
          <div className={styles.abilityDesc}>
            <p>{ability.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Abilities;
