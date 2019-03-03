import React, { Component } from "react";

export default class SearchField extends Component {
  render() {     
    return (
      <div>
        <input
          className="header__search-field"
          type="text"
          value={this.props.query}
          placeholder="Find something ......."
          onChange={event => {
            this.props.changeQuery(event.target.value);
          }}
          onKeyPress={key => {
            if (key.key === "Enter") {
              this.props.setValue(this.props.query);
            }
          }}
        />
        <button
          className="header__find-movies-btn"
          onClick={() => {
            this.props.menuToggler.checked = false;
            this.props.setValue(this.props.query);
            this.props.togglerMobileMenu(this.props.menuToggler.checked);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
