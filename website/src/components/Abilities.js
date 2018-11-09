import React, { Component } from 'react';
import styles from './Abilities.module.css';

class Abilities extends Component {
  constructor(props) {
    super(props);
    this.state = { abilities: this.props.abilities, currAbility: 1 };
    console.log("abilities");
    console.log(this.state.abilities);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log("clicked");
    e.stopPropagation();
    console.log(e.target.className);

    const clickedClass = e.target.className.split("_")[1];
    console.log(clickedClass);

    if (clickedClass === "abilityP") {
      this.setState({ abilities: this.state.abilities, currAbility: 0 });
    } else if (clickedClass === "abilityQ") {
      this.setState({ abilities: this.state.abilities, currAbility: 1 });
    } else if (clickedClass === "abilityW") {
      this.setState({ abilities: this.state.abilities, currAbility: 2 });
    } else if (clickedClass === "abilityE") {
      this.setState({ abilities: this.state.abilities, currAbility: 3 });
    } else if (clickedClass === "abilityR") {
      this.setState({ abilities: this.state.abilities, currAbility: 4 });
    }
  }

  render() {
    const abilities = this.state.abilities;
    const ability = abilities[this.state.currAbility];
    return (
      <div className={styles.abilitiesWrapper}>
        <h1 className={styles.abilitiesHeader}>Abilities</h1>
        <div className={styles.abilityIcons}>
          <div onClick={this.handleClick} className={styles.abilityP}></div>
          <div className={styles.vline}></div>
          <div onClick={this.handleClick} className={styles.abilityQ}></div>
          <div onClick={this.handleClick} className={styles.abilityW}></div>
          <div onClick={this.handleClick} className={styles.abilityE}></div>
          <div onClick={this.handleClick} className={styles.abilityR}></div>
        </div>
        <div className={styles.ability}>
          <div className={styles.abilityName}>
            <p>{ability.name}</p>
          </div>
          <div className={styles.costrange}>
            <div className={styles.cost}>
              <div className={styles.costChangeIcon}></div>
              <p>Cost: {ability.costBurn} {ability.costType}</p>
            </div>
            <div className={styles.range}>
              <div className={styles.rangeChangeIcon}></div>
              <p>Range: {ability.rangeBurn}</p>
            </div>
          </div>
          <div className={styles.abilityDesc}>
            <p>{ability.description}</p>
          </div>
        </div>
      </div>
    );

  }
}

export default Abilities;
