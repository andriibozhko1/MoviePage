import React, { Component } from "react";

export default class MainItem extends Component {
  render() {
    let item = this.props.data;
    return (
      <>
        <li className="Main__item" key={item.id}>
          <div className="Main__item-poster">
            {" "}
            <img
              className="Main__item-poster-img"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="poster"
            />{" "}
            <div className="Main__item-poster-snippet-block-hide">
              <div className="Main__item-poster-snippet">{item.overview}</div>
              <div>...</div>
            </div>
          </div>
          <div className="Main__item-info">
            <div className="Main__item-title">{item.title}</div>
            <div className="Main__item-year">
              {item.release_date.split("-")[0]}
            </div>
          </div>
        </li>
      </>
    );
  }
}
