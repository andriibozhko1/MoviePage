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
          mobileMenuStatus={this.props.mobileMenuStatus}
          />
        <div className="Main__movies">
          <ul className="Main__list">
            {this.props.items.length <= 0 ? (
              <div className="Main__no-items-error">
                Sorry, but your search results 0 =(
              </div>
            ) : (
              this.props.items.map(item => {
                return <MainItem key={item.id} data={item} />;
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}
