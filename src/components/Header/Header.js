import React, { Component } from "react";
import "./Header.scss";
import menuIcon from '../../img/menu.svg'


export default class Header extends Component {
  state = {
    settings: {                  
      query: '',
    },
  };

  changeQuery = (value) => {
    this.setState(({ settings }) => {
      return {
        settings: {
          ...settings,
          query: value,
        }
      }
    })
  }

  render() {
    return (
      <>
        <div className="header">
          <div className="header__logo" />
          <div>
              <input 
              className="header__search-field" 
              type="text"
              value={this.state.settings.query}
              placeholder="Find something ......."
              onChange={(event) => {
                this.changeQuery(event.target.value)
              }}
              onKeyPress={(key) => { 
                if(key.key === 'Enter') {
                  this.props.setValue(this.state.settings.query)
                }
              }}
              />
            <button 
            className="header__find-movies-btn"
            onClick={() => { 
              this.props.setValue(this.state.settings.query)
            }}>
              Search
            </button>
          </div>
          <div >
              
              <label>
                <img className="header__open-mobile-menu" src={menuIcon} alt="icon menu"/>
                <input 
                name="mobileMenuIsOpen"
                className="mobile-menu-toggler" 
                type="checkbox"
                onClick={(event) => {
                  this.props.OpenAndCloseMobileMenu(event.target.checked)
                }}
                />
              </label>
            </div>
        </div>
      </>
    );
  }
}
