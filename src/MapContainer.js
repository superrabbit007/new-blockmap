import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
// import Foursquare from './Foursquare'

const style ={
	width: '100%',
	height: '100%',
	position: 'absolute'
}

var foursquare = require('react-foursquare')({
  clientID: 'AIRZBMKYSGK01J2WDA21RRZPY11IAV4HNUPCKLSNXOPVXJYE',
  clientSecret: '3NLLSRLAXPC0R3RNGWD2CKFCHF0RP3XU3L2UVPOZAD3LQMXB'  
});


class MapContainer extends Component {
	state={
		map: null,
		currentMarker: {},
		showingInfo: false,
		selectLoc: null,
		item1:{}
	}

	// componentWillReciveProps(nextProps) {
	// 	console.log(nextProps);
	// 	this.setState({
	// 		showingInfo: true
	// 		// currentMarker: 
	// 	})
	// }

	onMarkerClick = (props,marker,e) => {
		console.log(props,marker);
		console.log(this.state.showingInfo);
		this.setState({
			showingInfo: true,
			currentMarker: marker,
			selectLoc: props,
			items:{} })
		console.log(props.position);
		if(this.state.selectLoc!==null) {
			var loca=this.state.selectLoc.position;
		    var ll=loca.lat+","+loca.lng;
		    var query=this.props.location.title;
		    this.setState({item1: {}, item2: {}});
			foursquare.venues.getVenues({ll,query})
			.then(res=> {
			console.log(res);
			this.setState({ item1: res.response.venues[0],
				item2: res.response.venues[1]})}
			);	
		}
	}
	

	mapReady = (props, map) => {
		this.setState({
			map: map
		});
	}
	


	render() {
		let locations=this.props.location;

		var bounds = new this.props.google.maps.LatLngBounds();
		for (var i = 0; i < locations.length; i++) {
		  bounds.extend(locations[i].location);
		}
    	console.log(this.state.item1);

		return(
			<Map
				google={this.props.google}
				zoom={15}
				initialCenter={{
					lat:22.543096, 
	              	lng: 114.05786499999999
				}}
				style={style}
				bounds={bounds}
				onReady={this.mapReady}>
				{this.props.location.map((loc,index)=>( 
	            	<Marker	
	            		key={index}
	            		title={loc.title}
	            		position={loc.location}
	            		ref={loc.title}
	            		onClick={this.onMarkerClick}
	            	/>
	            		// onMouseoverMarker={this.onMouseoverMarker}/>
	            ))}
	            <InfoWindow
	            	visible={this.state.showingInfo}
	            	marker={this.state.currentMarker}>
					<h2>{this.state.selectLoc? this.state.selectLoc.title : ""}</h2>
			        <div>Items:</div>
			        {this.state.item1?<p>{this.state.item1.name}</p> : "None"}
			        {this.state.item2?<p>{this.state.item2.name}</p> : "None"}
	            </InfoWindow>
			</Map>
		)
	}
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAbUCvFRJ7Q68Y1fvtm1eW5zfaQsqT6FTk'
})(MapContainer);