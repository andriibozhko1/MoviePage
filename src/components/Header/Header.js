import React, { Component } from "react";
import "./Header.scss";
import HideMenu from "./hide-menu";
import whiteDownArrowIcon from "../../img/down-arrow-white.svg";

export default class Header extends Component {
  state = {
    settings: {
      genresMoviesList: [],
      selectedGenre: null,
      genreId: null,
      year: 2019,
      query: '',
    },
    hideMenuIsOpen: false
  };

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=5874acfd11651a28c55771624f7021f4&language=en-US"
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState(({ settings }) => {
          settings.genresMoviesList = result.genres;

          return {
            settings
          };
        });
      });
  }

  openHideMenu = () => {
    this.setState(({ hideMenuIsOpen }) => {
      hideMenuIsOpen = !this.state.hideMenuIsOpen;

      return {
        hideMenuIsOpen
      };
    });
  };

  selectGenre = (id, name) => {
    this.setState(prevState => {
      prevState.settings.genreId = id;
      prevState.settings.selectedGenre = name;
      prevState.hideMenuIsOpen = false;
      return {
        prevState
      };
    });
  };

  setYear = year => {
    this.setState(prevState => {
      prevState.settings.year = year.replace(/\D/g, "").substr(0, 4);

      return prevState;
    });
  };

  updateData = () => {
    this.props.updateData(
      this.state.settings.genreId,
      this.state.settings.year
    );
  };

  setDefaultData = () => {
    this.setState(({ settings }) => {
      settings.selectedGenre = null;
      settings.genreId = null;
      settings.year = 2019;
      settings.query = '';

      return {
        settings
      }
    }, () => {
      this.props.updateData(this.state.settings.genreId, this.state.settings.year);
    })
  };

  changeQuery = (value) => {
    this.setState(({ settings }) => {
      settings.query = value;

      return {
        settings
      }
    })
  }

  render() {
    return (
      <>
        <div className="header">
          <div className="header__filter">
            Settings:
            <img
              className="header__filter-icon"
              src={whiteDownArrowIcon}
              alt="down-arrow"
            />
            <HideMenu
              settings={this.state.settings}
              selectGenre={this.selectGenre}
              openHideMenu={this.openHideMenu}
              hideMenuIsOpen={this.state.hideMenuIsOpen}
              year={this.state.settings.year}
              setYear={this.setYear}
              sendData={this.updateData}
              setDefaultData={this.setDefaultData}
            />
          </div>
          <div className="header__logo" />
          <div>
              <input 
              className="header__search-field" 
              type="text"
              value={this.state.settings.query}
              onChange={(event) => {
                this.changeQuery(event.target.value)
              }}
              />
            <button 
            className="header__find-movies-btn"
            onClick={() => { 
              this.props.setValue(this.state.settings.query)
            }}>Search</button>
          </div>
        </div>
      </>
    );
  }
}
