import React, { Component } from 'react';
import './Header.scss'
import arrowIcon from '../../img/down-arrow.svg'

export default class Header extends Component{
  
  state = {
    genresMoviesList: [],
  }



  render() {    
    console.log(this.state)
    return (
      <>
        <div className="header">
          <div className="header__filter">Settings
           <img className="header__filter-icon" src={arrowIcon} alt="down-arrow"/>
           <div className="header__filter-hide-menu">
            <ul>
              {this.state.genresMoviesList.map(genre => {
                return (
                  <li key={genre.id}>{ genre.name }</li>
                )
              })}
            </ul>
           </div> 
          </div>          
          <div className="header__logo"></div>
          <div><label> Search: <input className="header__search-field" type="text"/></label></div>
        </div>
      </>
    )
  }
}