import React, { Component } from "react";
import "./App.css";

import Header from "./Header";

class Landing extends Component {
  render() {
    return (
      <div className="uk-container App">
        <Header />
        <div className="uk-margin-large-top">
          <div className="uk-container-small uk-margin-auto">
            <h1 className="appName uk-text-center uk-heading-hero uk-text-bold">
              PATCH VIEW
            </h1>
            <h5 className="appDesc uk-text-center">
              Find changes to your champs since you last played
            </h5>

            <div className="uk-flex uk-flex-center ">
              <button
                className="clear-button uk-margin-right"
                uk-toggle="target: #modal-close-default"
              >
                <img
                  className="icon-circular orange-outline"
                  src={
                    "https://vignette.wikia.nocookie.net/leagueoflegends/images/c/cc/AatroxSquare.png"
                  }
                  alt=""
                />
              </button>
              <div className="uk-margin">
                <div uk-form-custom="target: true">
                  <input className="uk-input" type="text" placeholder="Name" />
                </div>
                <button className="uk-button uk-button-default uk-light">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="modal-close-default" uk-modal="">
          <div className="uk-modal-dialog uk-modal-body">
            <button
              className="uk-modal-close-default"
              type="button"
              uk-close=""
            />
            <h2 className="uk-modal-title uk-text-center">
              Choose your champion
            </h2>
            <button
              className="clear-button uk-margin-right"
              uk-toggle="target: #modal-close-default"
            >
              <img
                className="icon-circular"
                src={
                  "https://vignette.wikia.nocookie.net/leagueoflegends/images/c/cc/AatroxSquare.png"
                }
                alt=""
              />
            </button>
            <button
              className="clear-button uk-margin-right"
              uk-toggle="target: #modal-close-default"
            >
              <img
                className="icon-circular"
                src={
                  "https://vignette.wikia.nocookie.net/leagueoflegends/images/c/cc/AatroxSquare.png"
                }
                alt=""
              />
            </button>
            <button
              className="clear-button uk-margin-right"
              uk-toggle="target: #modal-close-default"
            >
              <img
                className="icon-circular"
                src={
                  "https://vignette.wikia.nocookie.net/leagueoflegends/images/c/cc/AatroxSquare.png"
                }
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
