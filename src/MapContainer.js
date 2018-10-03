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

	// componentWillReciveProps
	componentWillReceiveProps(nextProps) {
		console.log(this.props.selectLoc);
		console.log(nextProps);
		console.log(this.ref);
		if(nextProps.selectLoc!== this.props.selectLoc) {
			const markers = this.refs;
			const marker= markers[nextProps.selectLoc.title].marker;
			this.setState({
				showingInfo: true,
				currentMarker: marker,
				selectLoc: nextProps.selectLoc
			})
		}
	}

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
		console.log(locations);

		var bounds = new this.props.google.maps.LatLngBounds();
		for (var i = 0; i < locations.length; i++) {
		  bounds.extend(locations[i].location);
		}
    	console.log(this.state.item1);
    	//根据搜索结果，设置map center
		let center;
		if(this.props.location.length!==0 && this.props.location.length<9) {
			console.log(this.props.location);
			console.log(this.props.location[0].location);
			center=this.props.location[0].location;
			// console.log(this.props.showLocation[0].location);
		}else {
			console.log('none');
			center={lat:22.543096, 
	              	lng: 114.05786499999999}
		}


		return(
			<Map
				google={this.props.google}
				zoom={15}
				center={center}
				style={style}
				bounds={bounds}
				onReady={this.mapReady}>
				{locations.map((loc,index)=>( 
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