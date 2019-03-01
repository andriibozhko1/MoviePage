import React, { Component } from "react";
import './side-bar.scss';

export default class SideBar extends Component {

  state = {
    genres: [],
    years: [],
    currentYear: null,
    dropDownIsOpen: false,
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5874acfd11651a28c55771624f7021f4&language=en-US")
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState(prevState => {
          prevState.genres = result.genres;

          return {
            prevState
          };
        });
      });
      this.createYearsList();
  }

  createYearsList = () => {
    let presentYear = new Date().getFullYear();    
    let years = [];
    
    for(let i = 1915; i <= 1990; i+=5) {
      years.unshift(i);
    }
    for(let i = 1991; i <= presentYear; i++) {
      years.unshift(i);
    }

    years.unshift('All times')

    this.setState(prevState => {
      prevState.years = years;

      return {
        presentYear
      }
    })
  }

  openDropDown = () => {    
    this.setState(prevState => {
      prevState.dropDownIsOpen = !this.state.dropDownIsOpen;
      return {
        prevState,
      }
    })
  }

  render() {       
    return (
      <>
        <div className={`SideBar ${this.props.mobileMenuStatus ? 'SideBar--active' : ''}`}>
          <div className="SideBar__title">Years:</div>       
          <div 
          className="SideBar__change-year"
          onClick={this.openDropDown}>
             <div className="SideBar__change-year-title">{this.state.currentYear ? this.state.currentYear : 'All times:'}</div>
            <ul
            hidden={!this.state.dropDownIsOpen}
            className="SideBar__change-year-list">
              {this.state.years.map(year => {
                return (
                  <li 
                  className="SideBar__change-year-item"
                  key={year}
                  onClick={() => {
                    if(year === 'All times') {
                      this.setState((prevState) => {
                        prevState.currentYear = 'All times';
                      }, () => {
                        this.props.setYear(year)                      
                      })
                      return;
                    }
                    this.setState((prevState) => {
                      prevState.currentYear = year;
                    }, () => {
                      this.props.setYear(year)
                    })
                  }}
                   >
                    {year}
                   </li>
                )
              })}
            </ul>
          </div>
          <div className="SideBar__title">Genres: </div>
          <ul className="SideBar__list">              
               <li 
               className="SideBar__item"
               onClick={() => {
                this.props.setMovieGenre(null);
               }}
               >
                All
               </li>
              {this.state.genres.map((genre) => {
                return (
                    <li 
                    key={genre.id} 
                    className={`SideBar__item ${genre.id === this.props.movieGenre ? 'SideBar__item--active' : ''}`}
                    onClick={() => {
                      this.props.setMovieGenre(genre.id);
                    }}
                    >
                      { genre.name }
                    </li>
                )
              })}
          </ul>
        </div>
      </>
    );
  }
}
