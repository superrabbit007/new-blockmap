import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const style ={
	width: '100%',
	height: '100%',
	positon: 'absolute'
}


class MapContainer extends Component {

	onMarkerClick() {

	}


	render() {
		let locations=this.props.location;

		var bounds = new this.props.google.maps.LatLngBounds();
		for (var i = 0; i < locations.length; i++) {
		  bounds.extend(locations[i].location);
		}

		return(
			<Map
				google={this.props.google}
				zoom={15}
				initialCenter={{
					lat:22.543096, 
	              	lng: 114.05786499999999
				}}
				style={style}
				bounds={bounds}>
				{this.props.location.map((loc,index)=>( 
	            	<Marker	
	            		key={index}
	            		title={loc.title}
	            		position={loc.location}
	            		onClick={(marker)=>this.onMarkerClick(marker)}
	            	/>
	            		// onMouseoverMarker={this.onMouseoverMarker}/>
	            ))}
			</Map>
		)
	}
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbUCvFRJ7Q68Y1fvtm1eW5zfaQsqT6FTk'
})(MapContainer);