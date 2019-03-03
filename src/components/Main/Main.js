import React, { Component } from "react";
import "./Main.scss";
import SideBar from "../side-bar/side-bar";
import MainItem from "./MainItem";

export default class Main extends Component {
  render() {    
    return (
      <div className="Main">
          <SideBar 
            setMovieGenre={this.props.setMovieGenre} 
            movieGenre={this.props.movieGenre}
            setYear={this.props.setYear}
            currentYear={this.props.currentYear}
            mobileMenuIsOpen={this.props.mobileMenuIsOpen}
          />
        <div className="Main__movies">
          {this.props.movies.length <= 0 ? (
            <div className="Main__no-items-error">
               Sorry, but your search results 0.
            </div>
          ):(
            <ul className="Main__list">
          {this.props.movies.map(movie => <MainItem key={movie.id} data={movie} />)}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
