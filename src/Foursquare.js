import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Locations} from './Locations'
// import foursquare from 'react-foursquare'

var foursquare = require('react-foursquare')({
  clientID: 'EYD4ITT1SJ0DV352BV20GJ10XRV5VMAFJSKXHYC5J1SIWDZL',
  clientSecret: 'FEJZRJW45DHYAX3YSO5AY1TDIT3YIT2Q5YTOJT2NZM03O0CG'  
});

var params = {
  "loca": "22.543096,114.05786499999999",
  "query": '花店'
};

class Foursquare extends Component {

  state={
    items: []
  }

  // componentDidMount() { 
  //   var {self}=this.props.location;
  //   console.log(self);
  //   foursquare.venues.getVenues(params)
  //     .then(res=> {
  //       console.log(res);
  //       this.setState({ items: res.response.venues });
  //     });
  // }

  render() {
    console.log(this.props.location);
    if(this.props.location!==null) {
      var loca=this.props.location.position;
      var ll=loca.lat+","+loca.lng;
      var query=this.props.location.title;
      foursquare.venues.getVenues({ll,query})
      .then(res=> {
        console.log(res);
        this.setState({ items: res.response.venues });
      });
    }
    console.log(this.state.items);
    return (
    <div>
        <div>Items:</div>
        { this.state.items.map(item=> { return <div key={item.id}>{item.name}</div>}) }
    </div>
    )
  }
}

export default Foursquare;