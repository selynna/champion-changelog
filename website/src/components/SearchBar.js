import React, { Component } from "react";
import "./SearchBar.css";
import championList from "./ChampionsList";

class SearchItem extends Component {
  render() {
    return (
      <li
        className="champs-list-item champs-list-item-hover"
        onClick={this.props.setSelectedChamp}
      >
        <img
          className="icon-circular"
          src={this.props.champ.image}
          alt={this.props.champ.name}
        />
        <div className="champs-list-item-info">
          <div className="champs-list-item-name">{this.props.champ.name}</div>
          <div className="champs-list-item-title">{this.props.champ.title}</div>
        </div>
      </li>
    );
  }
}
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredChampions: championList,
      displayedChampions: [],
      selectedChamp: null,
      searchQuery: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.setSelectedChamp = this.setSelectedChamp.bind(this);
  }

  handleSearch(event) {
    var searchQuery = event.target.value.toLowerCase();

    var filteredChampions = championList.filter(champ => {
      var searchValue = champ.name.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedChampions: searchQuery.length > 2 ? filteredChampions : [],
      filteredChampions,
      searchQuery
    });
  }

  setSelectedChamp(champ) {
    this.setState({
      selectedChamp: champ,
      searchQuery: champ.name,
      displayedChampions: []
    });

    this.props.onChangeChamp(champ);
  }
  render() {
    return (
      <div className="search-champs">
        <input
          type="text"
          className="search-champ-field"
          placeholder="Search Champion"
          onChange={this.handleSearch}
          value={this.state.searchQuery}
        />

        <ul
          className="champs-list"
          style={{
            boxShadow:
              this.state.displayedChampions.length > 0
                ? "0 0 1em 0.25em rgba(0,0,0,0.2)"
                : ""
          }}
        >
          {this.state.displayedChampions.map((el, key) => {
            return (
              <SearchItem
                key={key}
                champ={el}
                setSelectedChamp={this.setSelectedChamp.bind(this, el)}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
