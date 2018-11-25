import React from "react";
import styles from "./PatchCard.module.css";

const PatchCard = props => {
  const { patch, items, runes } = props;
  const changes = [];

  console.log(patch);

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
                if (change[attribute].before && change[attribute].after) {
                  return (
                    <div
                      key={attribute}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        className={
                          change[attribute].isBuff
                            ? styles.statUpIcon
                            : styles.statDownIcon
                        }
                      />

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
      changes.push(
        <div key={section.changes.item_name}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div
              className={styles.itemIcon}
              style={{
                backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/8.22.1/img/item/${
                  items[section.changes.item_name].image.full
                }')`
              }}
            />
            <h5 style={{ color: "#1abc9c" }}>{section.changes.item_name}</h5>

            <div
              className={
                section.changes.isBuff ? styles.statUpIcon : styles.statDownIcon
              }
            />
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
                background: `url('https://ddragon.leagueoflegends.com/cdn/img/${
                  runes[section.changes.name]
                }') no-repeat 0 0`,
                backgroundSize: `100% 100%`
              }}
            />
            <h5 style={{ color: "#9b59b6" }}>{section.changes.name}</h5>
            <div
              className={
                section.changes.isBuff ? styles.statUpIcon : styles.statDownIcon
              }
            />
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
      <div className={styles.patchCard}>
        <h2>Patch Notes</h2>
        {changes}
      </div>
    </div>
  );
};

export default PatchCard;
