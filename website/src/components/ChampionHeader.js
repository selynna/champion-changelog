import React from "react";
import styles from "./ChampionHeader.module.css";

const IMG_URL = "https://ddragon.leagueoflegends.com/cdn/8.22.1/img";

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

const ChampionHeader = props => {
  const { champData, lastPlayed, lastPlayedPatch } = props;
  const champImg = `${IMG_URL}/champion/${champData.image.full}`;
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
};

export default ChampionHeader;
