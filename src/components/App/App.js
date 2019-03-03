import React, { Component } from 'react';
import "../../style/normalize.css";
import "../../style/style.scss";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";

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

  getAllItems = () => { 
    let urlAPI = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currentPage}${this.state.movieGenre ? `&with_genres=${this.state.movieGenre}` : ''}${this.state.year ? `&primary_release_year=${+this.state.year}` : ''}`
    
    fetch(urlAPI)
      .then((response) => response.json())
        .then((result) => {
        this.setState({
          items: result.results,
          quantityItems: result['total_results'],
          quantityPage: Math.min(1000, result['total_pages'])
        }, () => {
          window.scrollTo(0,0);
        })
      })
  }

  setYear = (year) => {
    this.setState({ year }, () => {
      this.getAllItems();
    })
  }

  changeQuery = (value) => {
    this.setState({ query: value })
  }

  setValue = (query) => {

    this.setState({
      query,
      searchMode: true,
      currentPage: 1,
    }, () => this.findMovieByQuery())
  }

  setNewPage = (selectedPage) => {        

    this.setState({
      currentPage: selectedPage
    }, () => this.state.searchMode ? (
      this.findMovieByQuery()
    ) : (
      this.getAllItems()
    ))
  }

  setDefaultState = () => {
    this.setState({
      mobileMenuIsOpen: false,
      searchMode: false,
      items: [],
      currentPage: 1,
      quantityItems: 0,
      quantityPage: 1000,
      movieGenre: null,
      year: null,  
      query: '',    
    }, () => this.getAllItems())
  }

  findMovieByQuery = () => {
    if(this.state.query === '') {
      this.setState({
        searchMode: false,
      }, () => this.getAllItems());

      return;
    }    
    let urlAPI = `https://api.themoviedb.org/3/search/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US${`&query=${this.state.query}`}&page=${this.state.currentPage}&include_adult=false`;
    
    fetch(urlAPI)
      .then((response) => {
        return response.json()
      }).then((result) => {
        this.setState({
          items: result.results,
          query: '',
          quantityItems: result['total_results'],
          quantityPage: Math.min(1000, result['total_pages'])
        });
      });
  }

  setMovieGenre = (genreId) => {
    this.setState({
      movieGenre: genreId,
      currentPage: 1,
    }, () => this.getAllItems())
  }

  togglerMobileMenu = (status) => {
    this.setState({
      mobileMenuIsOpen: status,
    })
  }

  render() {       
    return (
        <div className="container">
          <Header             
              setValue={this.setValue}
              query={this.state.query}
              togglerMobileMenu={this.togglerMobileMenu}
              setDefaultState={this.setDefaultState}
              changeQuery={this.changeQuery}
          />
          <Main
              movies={this.state.items}
              setMovieGenre={this.setMovieGenre}
              movieGenre={this.state.movieGenre}
              setYear={this.setYear}
              currentYear={this.state.year}
              mobileMenuIsOpen={this.state.mobileMenuIsOpen}
            />
          <Pagination
              quantityPages={this.state.quantityPage}
              currentPage={this.state.currentPage}
              setNewPage={this.setNewPage}
           />
           <Footer />
        </div>
    );
  }
}
