import React, { Component } from 'react'

export default class SelectYears extends Component {
  
  state = {
    years: [],
    dropDownIsOpen: false
  }

  componentDidMount() {
    this.createYearsList()
  }
  
  createYearsList = () => {
    let presentYear = new Date().getFullYear();
    let years = [];

    for (let i = 1915; i <= 1990; i += 5) {
      years.unshift(i);
    }
    for (let i = 1991; i <= presentYear; i++) {
      years.unshift(i);
    }

    years.unshift("All times");

    this.setState({ years });
  };

  openDropDown = () => {
    this.setState(prevState => {
      prevState.dropDownIsOpen = !this.state.dropDownIsOpen;
      return {
        prevState
      };
    });
  };

  render() {
    return (
      <>
        <div className="SideBar__title">Years:</div>
          <div className="SideBar__change-year" onClick={this.openDropDown}>
            <div className="SideBar__change-year-title">
              {this.props.currentYear ||  "All times:"}
            </div>
            <ul hidden={ !this.state.dropDownIsOpen } className="SideBar__change-year-list">
              {this.state.years.map(year => {
                return (
                  <li
                    className="SideBar__change-year-item"
                    key={year}
                    onClick={() => (
                      year === "All times" ? (
                        this.props.setYear(null)
                      ) : (
                        this.props.setYear(year)
                      )
                    )}
                  >
                    {year}
                  </li>
                );
              })}
            </ul>
          </div>  
      </>
    )
  }
}
