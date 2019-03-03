import React, { Component } from "react";

export default class MainItem extends Component {
  render() {
    let movie = this.props.data;    
    return (
      <>
        <li className="Main__item" key={movie.id}>
          <div className="Main__item-poster">
            {" "}
            <img
              className="Main__item-poster-img"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />{" "}
            <div className="Main__item-poster-snippet-block-hide">
              <div className="Main__item-poster-snippet">{movie.overview}</div>
              <div>...</div>
            </div>
          </div>
          <div className="Main__item-info">
            <div className="Main__item-title">{movie.title}</div>
            <div className="Main__item-year">
              {movie.release_date.split("-")[0]}
            </div>
          </div>
        </li>
      </>
    );
  }
}
