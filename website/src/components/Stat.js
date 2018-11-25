import React from "react";
import styles from "./Stat.module.css";

const Stat = props => {
  const { item, base, levelIncrease, buff } = props;
  let icon;

  if (buff === "buff") {
    icon = <div className={styles.statUpIcon} />;
  } else if (buff === "nerf") {
    icon = <div className={styles.statDownIcon} />;
  } else {
    icon = <div className={styles.statNoChangeIcon} />;
  }
  return (
    <div className={styles.statWrapper}>
      <div className={styles.statItemHeader}>
        {icon}
        <p className={styles.statItem}>{item}:</p>
      </div>
      <p className={styles.levelChange}>
        {base} (+{levelIncrease}
        {item === "Attack Speed" ? "%" : null} per level)
      </p>
    </div>
  );
};

export default Stat;
