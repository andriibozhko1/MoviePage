import React, { Component } from "react";
import "./Main.scss";

export default class Main extends Component {
  render() {
    return (
      <div className="Main">
        <ul className="Main__list">
          {this.props.items.length <= 0
             ? 
              <div className="Main__no-items-error">Sorry, but your search results 0 =(</div> 
            :
            this.props.items.map(item => {
              return (
                <li className="Main__item" key={item.id}>
                  <div className="Main__item-poster">
                    {" "}
                    <img
                      className="Main__item-poster-img"
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt=""
                    />{" "}
                    <div className="Main__item-poster-snippet-block-hide">
                      <div className="Main__item-poster-snippet">
                        {item.overview}
                      </div>
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
              );
            })
          }
        </ul>
      </div>
    );
  }
}
