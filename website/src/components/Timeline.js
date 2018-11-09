import React, { Component } from "react";
import styles from "./Timeline.module.css";
import InfoCard from "./InfoCard";
import ChampionHeader from "./ChampionHeader";
import HorizontalTimelineContent from "react-horizontal-timeline";
import ChampionData from "../assets/static-data/championFull.json";
import Loader from "react-loader";
import PatchCard from "./PatchCard";
import Items from '../assets/static-data/itemsFinal.json';
import ItemsArr from '../assets/static-data/item.json';

import Navbar from "./Navbar";

const patches = [
  "8.22",
  "8.21",
  "8.20",
  "8.19",
  "8.18",
  "8.17",
  "8.16",
  "8.15",
  "8.14",
  "8.13"
];

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      previous: 0,
      patches: [
        ["11/07/2018", "Patch 8.22"],
        ["11/06/2017", "Patch 8.21"],
        ["11/05/2016", "Patch 8.20"],
        ["11/04/2015", "Patch 8.19"]
      ],
      stylesBackground: "#f8f8f8",
      stylesForeground: "#F6D96B",
      stylesOutline: "#f8f8f8",
      baseStatDifferences: null,
      loaded: false,
      lastPlayed: null,
      lastPlayedPatch: "",
      changes: null
    };
  }

  componentDidMount() {
    // Fetch data from API
    // Uncomment after API endpoint finished
    const { match } = this.props;

    fetch(
      `http://${window.location.hostname}:4000/api/patchdata/${
        match.params.name
      }/${match.params.champId}`
    )
      .then(response => response.json())
      .then(data => {
        const changes = {};

        patches.forEach(function(patchNum) {
          for (var i = 0; i < data.championChanges.length; i++) {
            if (data.championChanges[i].patchId === patchNum) {
              if (!changes[patchNum]) {
                changes[patchNum] = [];
              }
              data.championChanges[i].type = "champion";
              changes[patchNum].push(data.championChanges[i]);
            }
          }

          if (
            data.itemChanges[patchNum] &&
            data.itemChanges[patchNum].length > 0
          ) {
            if (!changes[patchNum]) {
              changes[patchNum] = [];
            }

            data.itemChanges[patchNum].forEach(change => {
              change.type = "item";
            });
            changes[patchNum] = changes[patchNum].concat(
              data.itemChanges[patchNum]
            );
          }

          if (
            data.itemChanges[patchNum] &&
            data.runeChanges[patchNum].length > 0
          ) {
            if (!changes[patchNum]) {
              changes[patchNum] = [];
            }

            data.runeChanges[patchNum].forEach(change => {
              change.type = "rune";
            });
            changes[patchNum] = changes[patchNum].concat(
              data.runeChanges[patchNum]
            );
          }
        });

        this.setState({
          baseStatDifferences: data.baseStatDifferences,
          loaded: true,
          lastPlayed: new Date(data.lastPlayed),
          lastPlayedPatch: data.lastPlayedPatch,
          changes: changes
        });
      })
      .catch(err => console.log(err));
  }

  render() {

    let items = { Items }.Items;

    /*
    let itemsArr = { ItemsArr }.ItemsArr.data;
    let itemsTmp = {};
    console.log(itemsArr);
    for (var item in itemsArr) {
      itemsTmp[itemsArr[item].name] = {
        name: itemsArr[item].name,
        id: item,
        image: itemsArr[item].image
      }
    }

    console.log(JSON.stringify(itemsTmp));
    */
    
    const { match } = this.props;
    const champion = match.params.champId;

    const champData = { ChampionData }.ChampionData;
    const champions = champData.data;
    const baseStatDifferences = this.state.baseStatDifferences;

    const bg = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;

    // const patches = this.state.patches;
    let patches = [];

    if (this.state.loaded) {
      patches = Object.keys(this.state.changes).map(patchNum => {
        return [patchNum, "Patch " + patchNum];
      });
    }
    return (
      <div className={styles.timeline}>
        <Loader className={styles.loadedTimeline} loaded={this.state.loaded}>
          <div
            className={styles.timelineOverallWrapper}
            style={{
              background: `linear-gradient(0deg,rgba(56,165,247, 0.8),rgba(56,165,247,0.5)),url(${bg})`,
              backgroundSize: "cover",
              backgroundRepeat: "noRepeat"
            }}
          >
            <Navbar />
            <div className={styles.timelineInnerWrapper}>
              <div className={styles.info}>
                <div className={styles.championHeaderWrapper}>
                  <div className={styles.tmp}>
                    <ChampionHeader
                      champData={champions[champion]}
                      lastPlayed={this.state.lastPlayed}
                      lastPlayedPatch={this.state.lastPlayedPatch}
                    />
                  </div>
                </div>
                <div className={styles.infoCardContainer}>
                  <InfoCard
                    name={champion}
                    champData={champions[champion]}
                    bsd={baseStatDifferences}
                  />
                </div>
              </div>
              {patches.length > 0 ? (
                <div className={styles.timelineCardCombo}>
                  <div className={styles.timelineWrapper}>
                    <div className="text-center">
                      <div className={styles.timelinePatchCard}>
                        <PatchCard
                          name={champion}
                          champData={champions[champion]}
                          bsd={baseStatDifferences}
                          patch={
                            this.state.changes &&
                            Object.keys(this.state.changes).length > 0
                              ? this.state.changes[patches[this.state.value][0]]
                              : []
                          }
                          items={items}
                        />

                      </div>
                    </div>
                    <HorizontalTimelineContent
                      index={this.state.value}
                      indexClick={index => {
                        this.setState({
                          value: index,
                          previous: this.state.value
                        });
                      }}
                      styles={{
                        background: this.state.stylesBackground,
                        foreground: this.state.stylesForeground,
                        outline: this.state.stylesOutline
                      }}
                      values={patches}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.noChangesContainer}>
                  <div className={styles.noChanges}>
                    {`There are no changes since you last played ${
                      champions[champion].name
                    }`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

export default Timeline;
