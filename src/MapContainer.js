import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const style ={
	width: '100%',
	height: '100%',
	positon: 'absolute'
}


class MapContainer extends Component {
	render() {
		return(
			<Map
				google={this.props.google}
				zoom={15}
				initialCenter={{
					lat:22.543096, 
	              	lng: 114.05786499999999
				}}
				style={style}>
			</Map>
		)
	}
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbUCvFRJ7Q68Y1fvtm1eW5zfaQsqT6FTk'
})(MapContainer);