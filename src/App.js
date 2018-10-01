import React, { Component } from 'react';
import './App.css';
import locations from './Locations.js';
import Nav from './Nav';
import MapContainer from './MapContainer';
import Menu from './Menu';

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
        <div>
          <Menu />
          <MapContainer/>
        </div>
      </div>
    );
  }
}

export default App;
