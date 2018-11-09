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

    const abilities = [p, q, w, e, r];
    this.setState({ abilities: abilities, stats: stats });
  }

  render() {
    const { patch } = this.props;
    const changes = [];
    console.log("patch");
    console.log(patch);
    console.log(this.props.items);

    patch.forEach(section => {
      if (section.type === "champion") {
        section.changes.forEach((change, key) => {
          changes.push(
            <div key={key}>
              <h5 style={{ color: "#3498db" }}>{change.name}</h5>

              {Object.keys(change)
                .filter(
                  attribute => !(attribute === "name" || attribute === "isBuff")
                )
                .map(attribute => {
                  if (
                    change[attribute].before !== undefined &&
                    change[attribute].after !== undefined &&
                    change[attribute].before !== null &&
                    change[attribute].after !== null
                  ) {
                    return (
                      <div
                        key={attribute}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {change[attribute].isBuff ? (
                          <div className={styles.statUpIcon} />
                        ) : (
                          <div className={styles.statDownIcon} />
                        )}
                        <p style={{ margin: "5px", maxWidth: "286px" }}>
                          <span className={styles.attributeName}>
                            {attribute}
                          </span>
                          {`: ${
                            change[attribute].before.length > 0
                              ? change[attribute].before + " => "
                              : change[attribute].before
                          } ${change[attribute].after}`}
                        </p>
                      </div>
                    );
                  } else if (change[attribute].removed) {
                    const attributeLabel = attribute.slice("removed".length);

                    return (
                      <p key={attribute}>
                        <span className={styles.attributeName}>
                          {attributeLabel}
                        </span>
                        {`: Removed => ${change[attribute].removed}`}
                      </p>
                    );
                  } else return null;
                })}
            </div>
          );
        });
      } else if (section.type === "item") {
        console.log("items");
        console.log(this.props.items[section.changes.item_name].image.full);
        changes.push(
          <div key={section.changes.item_name}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div 
                className={styles.itemIcon}
                style={{
                  backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/item/${
                    this.props.items[section.changes.item_name].image.full
                  }')`
                }}/>
              <h5 style={{ color: "#9b59b6" }}>{section.changes.item_name}</h5>
              {section.changes.isBuff ? (
                <div className={styles.statUpIcon} />
              ) : (
                <div className={styles.statDownIcon} />
              )}
            </div>
            {section.changes.attributes.map(attribute => {
              return (
                <p key={attribute.attribute}>
                  <span className={styles.attributeName}>
                    {attribute.attribute}
                  </span>
                  {`: ${
                    attribute["attribute-before"]
                      ? attribute["attribute-before"] + " => "
                      : ""
                  }${attribute["attribute-after"]}`}
                </p>
              );
            })}
          </div>
        );
      } else if (section.type === "rune") {
        changes.push(
          <div key={section.changes.name}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <div 
                className={styles.itemIcon}
                style={{
                  backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/item/${
                    this.props.items[section.changes.item_name].image.full
                  }')`
                }}/>
              <h5 style={{ color: "#9b59b6" }}>{section.changes.name}</h5>
              {section.changes.isBuff ? (
                <div className={styles.statUpIcon} />
              ) : (
                <div className={styles.statDownIcon} />
              )}
            </div>
            {Object.keys(section.changes)
              .filter(
                attribute => !(attribute === "name" || attribute === "isBuff")
              )
              .map(attribute => {
                return (
                  <p key={attribute}>
                    <span className={styles.attributeName}>{attribute}</span>
                    {`: ${section.changes[attribute]}`}
                  </p>
                );
              })}
          </div>
        );
      }
    });
    return (
      <div className={styles.patchCardWrapper}>
        <div className={styles.patchCard} style={{ overflowY: "scroll" }}>
          <h2>{`Patch Notes`}</h2>
          {changes}
        </div>
      </div>
    );
  }
}

export default PatchCard;
