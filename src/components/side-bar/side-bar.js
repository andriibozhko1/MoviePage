import React, { Component } from "react";
import SelectYear from './select-years'
import SelectGenre from './select-genre';
import "./side-bar.scss";

export default class SideBar extends Component {
  render() {
    return (
      <>
        <div className={`SideBar ${ this.props.mobileMenuIsOpen ?  "SideBar--active" : ""}`}>
          <SelectYear currentYear={this.props.currentYear} setYear={this.props.setYear}/>
          <SelectGenre setMovieGenre={this.props.setMovieGenre} movieGenre={this.props.movieGenre} />
        </div>
      </>
    );
  }
}
