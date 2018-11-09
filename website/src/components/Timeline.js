import React, { Component } from "react";
import styles from "./Timeline.module.css";
import InfoCard from "./InfoCard";
import ChampionHeader from "./ChampionHeader";
import HorizontalTimelineContent from "react-horizontal-timeline";
import ChampionData from "../assets/static-data/championFull.json";
import Loader from "react-loader";
import PatchCard from './PatchCard';

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
      stylesForeground: "#7b9d6f",
      stylesOutline: "#dfdfdf",
      baseStatDifferences: null,
      loaded: false,
      lastPlayed: null,
      lastPlayedPatch: ""
    };
  }

  componentDidMount() {
    // Fetch data from API
    // Uncomment after API endpoint finished
    const { match } = this.props;
    console.log(this.props.location);
    fetch(
      `http://${window.location.hostname}:4000/api/patchdata/${
        match.params.name
      }/${match.params.champId}`
    )
      .then(response => response.json())
      .then(data => {
        console.log("TEST");
        console.log(data);
        console.log(data.baseStatDifferences);
        let patches = [];
        for (var i = 0; i < data.championChanges.length; i++) {
          const patch = data.championChanges[i];
          const patchInfo = [patch.date, "Patch " + patch.id];
          patches.push(patchInfo);
        }
        this.setState({
          baseStatDifferences: data.baseStatDifferences,
          loaded: true,
          lastPlayed: new Date(data.lastPlayed),
          lastPlayedPatch: data.lastPlayedPatch,
          patches: patches
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { match } = this.props;
    const champion = match.params.champId;

    const champData = { ChampionData }.ChampionData;
    const champions = champData.data;
    const baseStatDifferences = this.state.baseStatDifferences;

    const patches = this.state.patches;
    return (
      <div className={styles.timeline}>
        <Loader className={styles.loadedTimeline} loaded={this.state.loaded}>
          <div className={styles.timelineOverallWrapper}>
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
            <div className={styles.timelineCardCombo}>
              <div className={styles.timelineWrapper}>
                <div className='text-center'>
                  <div className={styles.timelinePatchCard}>
                    <PatchCard
                      name={champion}
                      champData={champions[champion]}
                      bsd={baseStatDifferences}
                    />
                  </div>
                </div>
                <HorizontalTimelineContent
                  index={this.state.value}
                  indexClick={index => {
                    this.setState({ value: index, previous: this.state.value });
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
          </div>
        </Loader>
      </div>
    );
  }
}

export default Timeline;
