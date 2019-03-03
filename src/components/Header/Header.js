import React, { Component } from "react";
import SearchField from './SearchField'
import menuIcon from '../../img/menu.svg'
import "./Header.scss";



export default class Header extends Component {
  render() {    
    return (
      <>
        <div className="header">
          <div
           className="header__logo" 
           onClick={this.props.setDefaultState}
          />
          <div>
          <SearchField 
            changeQuery={this.changeQuery}
            menuToggler={this.menuToggler}
            togglerMobileMenu={this.props.togglerMobileMenu}
            setValue={this.props.setValue}
            query={this.props.query}
            changeQuery={this.props.changeQuery}
          />
          </div>
          <div >
              
              <label>
                <img className="header__open-mobile-menu" src={menuIcon} alt="icon menu"/>
                <input 
                name="mobileMenuIsOpen"
                className="mobile-menu-toggler" 
                type="checkbox"
                ref={(element) => {
                  if(element) {
                    this.menuToggler = element;
                  }
                }}
                onClick={(event) => {
                  this.props.togglerMobileMenu(event.target.checked)
                }}
                />
              </label>
            </div>
        </div>
      </>
    );
  }
}
