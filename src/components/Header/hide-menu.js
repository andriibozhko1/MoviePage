import React, { Component } from "react";
import whiteDownArrowIcon from "../../img/down-arrow-white.svg";

export default class HideMenu extends Component {
  render() {    
    return (
      <>
        <div className="header__filter-hide-menu">
          <div
            className={`header__filter-hide-menu-title ${
              this.props.hideMenuIsOpen
                ? "header__filter-hide-menu-title--active"
                : ""
            }`}
            onClick={this.props.openHideMenu}
          >
            Select genre: {this.props.settings.selectedGenre}
            <img
              className={`header__filter-hide-menu-icon ${
                this.props.hideMenuIsOpen
                  ? "header__filter-hide-menu-icon--open"
                  : ""
              }`}
              src={whiteDownArrowIcon}
              alt="down-arrow"
            />
          </div>
          <ul
            className="header__filter-hide-menu-list"
            hidden={!this.props.hideMenuIsOpen}
          >
            {this.props.settings.genresMoviesList.map(genre => {
              return (
                <li
                  className={`header__filter-hide-menu-item ${
                    this.props.settings.genreId === genre.id
                      ? "header__filter-hide-menu-item--selected"
                      : ""
                  }`}
                  key={genre.id}
                  onClick={() => {
                    this.props.selectGenre(genre.id, genre.name);
                  }}
                >
                  {genre.name}
                </li>
              );
            })}
          </ul>

          <div className="header__filter-hide-menu-title">Years:
            <input type="text" value={this.props.year} onChange={(event) => {                            
              this.props.setYear(event.target.value);
            }} />
           </div>
           <button
            className="header__filter-hide-menu-search-btn"
            onClick={this.props.setDefaultData}
           >
           Set Default
           </button>
           
           <button
            className="header__filter-hide-menu-search-btn"
            onClick={this.props.sendData}
           >
           Search
           </button>
        </div>
      </>
    );
  }
}
