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
      items: [],
      currentPage: 1,
      quantityItems: 0,
      quantityPage: 1000,
    };
  }

  componentDidMount() {
    this.getAllItems();
  }

  setNewPage = (selectedPage) => {    

    this.setState((prevState) => {
      prevState.currentPage = selectedPage;

      return {
        prevState
      }
    },() => {
      this.getAllItems();      
    })
  }

  getAllItems = () => { 
    let urlAPI = `https://api.themoviedb.org/3/discover/movie?api_key=5874acfd11651a28c55771624f7021f4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currentPage}`
    fetch(urlAPI)
      .then((response) => {
        return response.json()
      }).then((result) => {
        this.setState((prevState) => {
          prevState.items = result.results;
          prevState.quantityItems = result.total_results;   
          if(result.total_page <= 1000) {
            prevState.quantityPage = result.total_page;
          } else {
            prevState.quantityPage = 1000;
          }

          return (
            prevState
          )
        })
      });
  };

  render() {       
    console.log(this.state);     
    return (
      <>
        <div className="container">
          <Header />
          <Main
           items={this.state.items}/>
          <Pagination
           quantityPage={this.state.quantityPage}
           currentPage={this.state.currentPage}
           setNewPage={this.setNewPage}
           />
           Footer
        </div>
      </>
    );
  }
}
