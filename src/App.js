import React, { Component } from 'react';
import './App.css';
import locations from './Locations.js';
import Nav from './Nav';
import MapContainer from './MapContainer';
import Menu from './Menu';

class App extends Component {

  state={
    location: [],
    navShow: false
  }

  componentDidMount() {
    this.setState({
      location: locations
    })
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

  queryLocation() {
    
  }


  render() {
  console.log(this.state.location);
    return (
      <div id="container">
        <Nav 
        location={this.state.location}
        navBar = {this.state.navShow}
        queryLocation={(query)=>this.queryLocation(query)}/>
        <div className="main">
          <Menu 
            navChange={()=>this.navChange()}/>
          <div className="map">
              <MapContainer
                location={this.state.location}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
