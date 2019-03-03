import React, { Component } from "react";
import "./Pagination.scss";

export default class Pagination extends Component {
  goPrev = () => {
    const page = Math.max(1, this.props.currentPage - 1);
    this.props.setNewPage(page);
  };

  goNext = () => {
    const page = Math.min(this.props.quantityPages, this.props.currentPage + 1);
    this.props.setNewPage(page);
  };

  render() {
    const buttons = [];
    const start = Math.max(1, this.props.currentPage - 5);
    const end = Math.min(this.props.quantityPages, this.props.currentPage + 5);

    for (let i = start; i < end; i++) {
      buttons.push(i);
    }

    return (
      <>
        <div className="Pagination">
          <div className="Pagination__nav">
            <div className="Pagination__nav-btn" onClick={() => this.goPrev()}>
              {" "}
              Prev{" "}
            </div>
            {this.props.currentPage >= 8 ? (
              <>
                <div
                  className={`Pagination__nav-btn ${
                    this.props.currentPage === 1
                      ? "Pagination__nav-btn--active"
                      : ""
                  }`}
                  onClick={() => this.props.setNewPage(1)}
                >
                  1
                </div>
                <div className="Pagination__nav-btn">...</div>
              </>
            ) : (
              ""
            )}

            {buttons.map(item => {
              return (
                <div
                  key={item}
                  className={`Pagination__nav-btn ${
                    this.props.currentPage === item
                      ? "Pagination__nav-btn--active"
                      : ""
                  }`}
                  onClick={() => this.props.setNewPage(item)}
                >
                  {item}
                </div>
              );
            })}

            {this.props.currentPage <= this.props.quantityPages - 5 ? (
              <div className="Pagination__nav-btn">...</div>
            ) : (
              ""
            )}

            <div
              hidden={buttons.length === 0}
              className={`Pagination__nav-btn ${
                this.props.currentPage === this.props.quantityPages
                  ? "Pagination__nav-btn--active"
                  : ""
              }`}
              onClick={() => this.props.setNewPage(this.props.quantityPages)}
            >
              {this.props.quantityPages}
            </div>
            <div className="Pagination__nav-btn" onClick={() => this.goNext()}>
              Next
            </div>
          </div>
        </div>
      </>
    );
  }
}
