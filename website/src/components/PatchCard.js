import React, { Component } from "react";
import styles from "./PatchCard.module.css";

class PatchCard extends Component {
  constructor(props) {
    super(props);
    this.processData.bind(this);
  }

  componentWillMount() {
    this.processData(this.props.champData, this.props.bsd);
  }

  processData(champData, bsd) {
    const p = champData.passive;
    const q = champData.spells[0];
    const w = champData.spells[1];
    const e = champData.spells[2];
    const r = champData.spells[3];

    console.log("bsd");
    console.log(bsd.hp.statChange);
    const data = champData.stats;
    const stats = {
      hp: [data.hp, data.hpperlevel, bsd.hp.statChange],
      hpRegen: [data.hpregen, data.hpregenperlevel, bsd.hpregen.statChange],
      ad: [
        data.attackdamage,
        data.attackdamageperlevel,
        bsd.attackdamage.statChange
      ],
      mrRegen: [data.mpregen, data.mpregenperlevel, bsd.mpregen.statChange],
      attackSpeed: [
        data.attackspeed,
        data.attackspeedperlevel,
        bsd.attackspeedperlevel.statChange
      ],
      armor: [data.armor, data.armorperlevel, bsd.armor.statChange],
      mr: [data.spellblock, data.spellblockperlevel, bsd.spellblock.statChange],
      movement: [data.movespeed, 0, bsd.movespeed.statChange]
    };

    for (var stat in stats) {
      let buff = "buff";
      if (stats[stat][2] === 0) {
        buff = "nochange";
      } else if (stats[stat][2] < 0) {
        buff = "nerf";
      }
      stats[stat] = [
        parseFloat(stats[stat][0]).toFixed(1),
        parseFloat(stats[stat][1]).toFixed(1),
        buff
      ];
    }

    console.log(stats);
    const abilities = [p, q, w, e, r];
    this.setState({ abilities: abilities, stats: stats });
  }

  render() {
    console.log(this.props.patch);
    const { patch } = this.props;

    const changes = [];

    console.log(patch);
    patch.forEach(section => {
      if (section.type === "champion") {
        section.changes.forEach((change, key) => {
          changes.push(
            <div key={key}>
              <h5 style={{ color: "#3498db" }}>{change.name}</h5>
              {Object.keys(change)
                .filter(attribute => attribute !== "name")
                .map(attribute => {
                  if (change[attribute].before && change[attribute].after) {
                    return (
                      <p key={attribute}>{`${attribute}: ${
                        change[attribute].before
                      } => ${change[attribute].after}`}</p>
                    );
                  } else if (change[attribute].removed) {
                    const attributeLabel = attribute.slice("removed".length);
                    return (
                      <p key={attribute}>{`${attributeLabel}: Removed => ${
                        change[attribute].removed
                      }`}</p>
                    );
                  } else return null;
                })}
            </div>
          );
        });
      } else if (section.type === "item") {
        changes.push(
          <div key={section.changes.item_name}>
            <h5 style={{ color: "#1abc9c" }}>{section.changes.item_name}</h5>
            {section.changes.attributes.map(attribute => {
              return (
                <p key={attribute.attribute}>{`${attribute.attribute}: ${
                  attribute["attribute-before"]
                    ? attribute["attribute-before"] + " => "
                    : ""
                }${attribute["attribute-after"]}`}</p>
              );
            })}
          </div>
        );
      } else if (section.type === "rune") {
        changes.push(
          <div key={section.changes.name}>
            <h5 style={{ color: "#9b59b6" }}>{section.changes.name}</h5>
            {Object.keys(section.changes)
              .filter(attribute => attribute !== "name")
              .map(attribute => {
                return (
                  <p key={attribute}>{`${attribute}: ${
                    section.changes[attribute]
                  }`}</p>
                );
              })}
          </div>
        );
      }
    });
    console.log(changes);
    return (
      <div className={styles.patchCardWrapper}>
        <div className={styles.patchCard} style={{overflowY: 'scroll'}}>
          <h2>{`Patch Notes`}</h2>
          {changes}
        </div>
      </div>
    );
  }
}

export default PatchCard;
