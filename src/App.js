import React, { Component } from 'react';
import './App.css';
import locations from './Locations.js';
import Nav from './Nav';
import MapContainer from './MapContainer';
import Menu from './Menu';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {

  state={
    location: [],
    navShow: false,
    query: '',
    showLocation : []
  }

  componentDidMount() {
    this.setState({
      location: locations,
      showLocation: locations
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

  queryLocation = query =>{
    this.setState({query : query});
    let showLocations=[];
    console.log(query);

    if(query) {
      const match= new RegExp(escapeRegExp(query), 'i');
      console.log("this.state.location" + this.state.location);
      showLocations = this.state.location.filter((loc)=>{
        console.log("loc.title" + loc.title);
        console.log("match.test(loc.title)" + match.test(loc.title));
        return match.test(loc.title);
      });
      console.log("showLocations：" + showLocations);
        this.setState({
          showLocation: showLocations
        })
    }else {
      showLocations=this.state.location;
         this.setState({
           showLocation: showLocations
         })
    }

  }


  render() {
  console.log(this.state.location);
    return (
      <div id="container">
        <Nav 
        location={this.state.showLocation}
        navBar = {this.state.navShow}
        queryLocation={(query) =>this.queryLocation(query)}/>
        <div className="main">
          <Menu 
            navChange={()=>this.navChange()}/>
          <div className="map">
              <MapContainer
                location={this.state.showLocation}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
