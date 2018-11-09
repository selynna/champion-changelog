import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Timeline from "./Timeline.js";
import Landing from "./Landing.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Landing} />
            <Route path="/timeline/:name/:champId" component={Timeline} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
