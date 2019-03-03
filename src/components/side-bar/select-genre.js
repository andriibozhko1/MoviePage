import React, { Component } from 'react'

export default class SelectGenre extends Component {

  state = {
    genres: [],        
  };

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5874acfd11651a28c55771624f7021f4&language=en-US")
      .then(response => {
        return response.json();
      })
      .then(({ genres }) => {
        this.setState({ genres })
      });    
  }

  render() {
    return (
      <div>
        <div className="SideBar__title">Genres: </div>
          <ul className="SideBar__list">
            <li className="SideBar__item" onClick={() => this.props.setMovieGenre(null)}>
              All
            </li>
            {this.state.genres.map(genre => (
                <li 
                  key={genre.id} 
                  className={`SideBar__item ${ genre.id === this.props.movieGenre ? "SideBar__item--active" : "" }`} 
                  onClick={() => this.props.setMovieGenre(genre.id)} 
                  >
                    {genre.name}
                </li>
              ))}
          </ul>
      </div>
    )
  }
}
