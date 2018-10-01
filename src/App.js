import React, { Component } from 'react';
import './App.css';
import locations from './Locations.js';
import Nav from './Nav';
import MapContainer from './MapContainer';
import Menu from './Menu';

class App extends Component {

  state={
    location: locations,
    navShow: false
  }

  navChange() {
    if(!this.state.navShow) {
      this.setState({
        navShow: true
      })
    }else {
      this.setState({navShow: false})
    }
  }


  render() {
  console.log(this.state.location);
    return (
      <div id="container">
        <Nav 
        location={this.state.location}
        navBar = {this.state.navShow}/>
        <div className="main">
          <Menu 
            navChange={()=>this.navChange()}/>
          <div className="map">
              <MapContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
