import React, { Component } from 'react';
import './App.css';
import locations from './Locations.js';
import Nav from './Nav';
import MapContainer from './MapContainer'

class App extends Component {

  state={
    location: locations
  }



  render() {
  console.log(this.state.location);
    return (
      <div className="App">
        <Nav 
          location={this.state.location}
        />
        <MapContainer/>
      </div>
    );
  }
}

export default App;
