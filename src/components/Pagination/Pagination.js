import React, { Component } from "react";
import "./Pagination.scss";

export default class Pagination extends Component {
  state = {
    currentPage: this.props.currentPage,
    pagination: []
  };

  createPagination = item => {
    this.setState(
      ({ currentPage, pagination }) => {
        currentPage = item;
        currentPage = Math.min(currentPage, this.props.quantityPage);
        currentPage = Math.max(currentPage, 1);

        let paginationItems = [];

        for (let i = currentPage; i < currentPage + 4; i++) {
          paginationItems.push(i);
        }

        for (let i = currentPage; i > currentPage - 4; i--) {
          paginationItems.unshift(i);
        }

        paginationItems = paginationItems.filter((item, index) => {
          if (
            paginationItems.indexOf(item) === index &&
            item > 0 &&
            item < this.props.quantityPage
          ) {
            return true;
          }
        });
        pagination = paginationItems;
        console.log(pagination);
        return {
          pagination,
          currentPage
        };
      },
      () => {
        this.props.setNewPage(this.state.currentPage);
      }
    );
  };

  componentDidMount() {
    this.createPagination(this.props.currentPage);
  }

  render() {

    return (
      <div className="Pagination">
        <div className="Pagination__nav">
          <div
            className="Pagination__nav-btn"
            onClick={() => {
              this.createPagination(this.state.currentPage - 1);
            }}
          >
            Prev
          </div>
          {this.state.currentPage >= 6 ? (
            <>
              <div
                className="Pagination__nav-btn"
                onClick={() => {
                  this.createPagination(1);
                }}
              >
                1
              </div>
              <div
                className="Pagination__nav-btn"
                onClick={() => {
                  this.createPagination(this.state.pagination[0] - 4);
                }}
              >
                ...
              </div>
            </>
          ) : (
            ""
          )}

          {this.state.pagination.map(item => {
            return (
              <div
                key={item}
                className={`Pagination__nav-btn ${
                  item === this.state.currentPage
                    ? "Pagination__nav-btn--active"
                    : ""
                }`}
                onClick={() => {
                  this.createPagination(item);
                }}
              >
                {item}
              </div>
            );
          })}

          <div
            className="Pagination__nav-btn"
            onClick={() => {
              this.createPagination(this.state.pagination[this.state.pagination.length - 1] + 4);
            }}
          >
            ...
          </div>

          <div
            className={`Pagination__nav-btn ${
              this.state.currentPage === this.props.quantityPage
                ? "Pagination__nav-btn--active"
                : ""
            }`}
            onClick={() => {
              this.createPagination(this.props.quantityPage);
            }}
          >
            {this.props.quantityPage}
          </div>
          <div
            className="Pagination__nav-btn"
            onClick={() => {
              this.createPagination(this.state.currentPage + 1);
            }}
          >
            Next
          </div>
        </div>
      </div>
    );
  }
}
