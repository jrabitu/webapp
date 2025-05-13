import React from "react";
import "./styles.css";
/**
 * Define States, a React component of CS142 Project 4, Problem 2. The model
 * data for this view (the state names) is available at
 * window.cs142models.statesModel().
 */

class States extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.cs142models.statesModel()",
      window.cs142models.statesModel()
    );

    this.state={ userSearch: '',
      allStates: window.cs142models.statesModel(),
      filterteiStates: window.cs142models.statesModel(),
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event){
    const newSearch = event.target.value;
    this.setState({userSearch: newSearch}, ()=> {
      this.filterteiStates();
    });
  }

  filterteiStates() {
    const searchItm= this.state.userSearch.toLowerCase();
    const filtered = this.state.allStates.filter(state => state.toLowerCase().includes(searchItm)).sort();
    this.setState({filterteiStates: filtered});
  }

  render() {
    const {userSearch, filterteiStates} = this.state;

    return(
      <div className="states">
        <h1> States of USA</h1>
        <input 
          id="search"
          type="text"
          placeholder="Search states"
          value= {userSearch}
          onChange = {this.handleSearchChange}
        />
      
      <p> Filter word: {userSearch}</p>

      {filterteiStates.length === 0 ? (
        <p> there is no such state as: {userSearch}</p>
      ):(
        <ul className="states-ul">
          {filterteiStates.map((state, index) => (
            <li key={index}>{state}</li>
          ))}
        </ul>
      )}
      </div>
    );
  }
}

export default States;