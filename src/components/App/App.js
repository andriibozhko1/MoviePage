import React, { Component } from 'react';
import "../../style/normalize.css";
import "../../style/style.scss";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Pagination from "../Pagination/Pagination";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenuIsOpen: false,
      searchMode: false,
      items: [],
      currentPage: 1,
      quantityItems: 0,
      quantityPage: 1000,
      movieGenre: null,
      year: null,  
      query: '',    
    };
  }

  componentDidMount() {
    this.getAllItems();
  }

  setYear = (year) => {
    this.setState(prevState => {
      prevState.year = year;

      return {
        prevState
      }
    }, () => {
      this.getAllItems();
    })
  }

  setValue = (query) => {
    this.setState(prevState => {
      prevState.query = query;
      prevState.searchMode = true; 
      prevState.currentPage = 1;

      return {
        prevState
      }
    }, () => {      
      this.findMovieByQuery()
    })
  }

  setNewPage = (selectedPage) => {        
    this.setState((prevState) => {
      prevState.currentPage = selectedPage;
      
      return {
        prevState
      }
    },() => {    
      if(this.state.searchMode) {
        this.findMovieByQuery();
        return;
      }  
      this.getAllItems();      
    })
  }

  findMovieByQuery = () => {
    if(this.state.query === '') {
      this.setState(({ searchMode }) => {
        searchMode = false;

        return {
          searchMode,
        }
      }, () => {
        this.getAllItems()
      })      

      return;
    }    
    let urlAPI = `https://api.themoviedb.org/3/search/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US${`&query=${this.state.query}`}&page=${this.state.currentPage}&include_adult=false`;
    
    fetch(urlAPI)
      .then((response) => {
        return response.json()
      }).then((result) => {
        this.setState((prevState) => {
          prevState.items = result.results;
          prevState.quantityItems = result.total_results;            

          if(result.total_pages <= 1000) {            
            prevState.quantityPage = result.total_pages;
          } else {
            prevState.quantityPage = 1000;
          }
          return (
            prevState
          )
        })
      });
  }

  getAllItems = () => { 
    let urlAPI = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currentPage}${this.state.movieGenre ? `&with_genres=${this.state.movieGenre}` : ''}${this.state.year ? `&primary_release_year=${+this.state.year}` : ''}`
    
    fetch(urlAPI)
      .then((response) => {
        return response.json()
      }).then((result) => {
        this.setState((prevState) => {
          prevState.items = result.results;
          prevState.quantityItems = result.total_results;   
          if(result.total_pages <= 1000) {            
            prevState.quantityPage = result.total_pages;
          } else {
            prevState.quantityPage = 1000;
          }
          return (
            prevState
          )
        })
      });
  };

  setMovieGenre = (genreId) => {
    this.setState(prevState => {
      prevState.movieGenre = genreId;
      prevState.currentPage = 1;

      return (
        prevState
      )
    }, () => {
      this.getAllItems()
    })
  }

  OpenAndCloseMobileMenu = (status) => {
    this.setState(prevState => {
      prevState.mobileMenuIsOpen = status;

      return {
        prevState
      }
    })
  }

  render() {       
    
    return (
      <>
        <div className="container">
          <Header             
            setValue={this.setValue}
            OpenAndCloseMobileMenu={this.OpenAndCloseMobileMenu}
            setDefaultState={this.getAllItems}
          />
          <Main
           items={this.state.items}
           setMovieGenre={this.setMovieGenre}
           movieGenre={this.state.movieGenre}
           setYear={this.setYear}
           mobileMenuStatus={this.state.mobileMenuIsOpen}
           />
          <Pagination
           quantityPages={this.state.quantityPage}
           currentPage={this.state.currentPage}
           setNewPage={this.setNewPage}
           />
           Footer
        </div>
      </>
    );
  }
}
