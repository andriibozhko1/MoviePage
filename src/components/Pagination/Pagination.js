import React, { Component } from "react";
import "./Pagination.scss";

export default class Pagination extends Component {

  paginationItems = [];

  createPaginationBtns = () => {
    this.paginationItems = [];
    for(let i = this.props.currentPage; i < this.props.currentPage + 5; i++) {
      this.paginationItems.push(i);
    }
    for(let i = this.props.currentPage; i >= this.props.currentPage - 5; i--) {
      this.paginationItems.unshift(i);
    }

    this.paginationItems = this.paginationItems.filter((item, index) => {
      if (this.paginationItems.indexOf(item) === index && item > 1 && item < this.props.quantityPages - 1) {
        return true;
      }
    })     
  }

  render() {
    this.createPaginationBtns();
    return (
      <>
        <div className="Pagination">
          <div className="Pagination__nav">
          <div 
            className="Pagination__nav-btn"
            onClick={() => {
              if(this.props.currentPage - 1 !== 0) {
                this.props.setNewPage(this.props.currentPage - 1);
              }            
            }}>
             Prev
          </div>
          <div 
          className={`Pagination__nav-btn ${this.props.currentPage === 1 ? 'Pagination__nav-btn--active' : ''}`}
          onClick={() => {
            this.props.setNewPage(1);
          }}
          >
             1 
          </div> 

            {this.props.currentPage >= 5 ? <div className="Pagination__nav-btn">...</div> : ''}
            {this.paginationItems.map(( item, index ) => {
              return (
                <div 
                key={index}
                className={`Pagination__nav-btn ${this.props.currentPage === item ? 'Pagination__nav-btn--active' : ''}`}
                onClick={() => {
                  this.props.setNewPage(item);
                }}
                >
                  { item }
                </div>
              )
            })}
            {this.props.currentPage <= this.props.quantityPages - 5 ? <div className="Pagination__nav-btn">...</div> : ''}
            <div className={`Pagination__nav-btn ${this.props.currentPage === this.props.quantityPages ? 'Pagination__nav-btn--active' : ''}`}
              onClick={() => {
                this.props.setNewPage(this.props.quantityPages);
              }}
            > 
              {this.props.quantityPages} 
            </div>          
            <div 
            className="Pagination__nav-btn"
            onClick={() => {
              if(this.props.currentPage + 1 <= this.props.quantityPages) {
                this.props.setNewPage(this.props.currentPage + 1);
              }            
            }}
            >
              Next
            </div>
          </div>
        </div>
      </>
    )
  }
}
