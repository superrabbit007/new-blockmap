import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import locations from './Locations.js';
import Nav from './Nav'

class App extends Component {

  state={
    location: locations
  }


  queryLocation(query) {
     // this.setState({})
    this.state.location.filter((loc)=>{
      loc.title
    });
  }

  render() {
  console.log(this.state.location);
    return (
      <div className="App">
        <Nav 
          location={this.state.location}
          queryLocation={(query)=>this.queryLocation(query)}/>
      </div>
    );
  }
}

export default App;
