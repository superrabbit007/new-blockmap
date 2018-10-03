import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import "./App.css";

const style = {
  width: "100%",
  height: "100%",
  position: "absolute"
};

//引入FourSquare API
var foursquare = require("react-foursquare")({
  clientID: "AIRZBMKYSGK01J2WDA21RRZPY11IAV4HNUPCKLSNXOPVXJYE",
  clientSecret: "3NLLSRLAXPC0R3RNGWD2CKFCHF0RP3XU3L2UVPOZAD3LQMXB"
});

class MapContainer extends Component {
  state = {
    map: null,
    currentMarker: {},
    showingInfo: false,
    selectLoc: null,
    item1: {},
    item2: {},
    errors: ''
  };

  /*处理搜索列表和地图的交互*/
  /*部分代码参考一对一讲解代码*/
  componentWillReceiveProps(nextProps) {
    console.log(this.props.selectLoc);
    console.log(nextProps);
    console.log(this.refs);
    if (nextProps.selectLoc !== this.props.selectLoc) {
      const markers = this.refs;
      const marker = markers[nextProps.selectLoc.title].marker;
      this.setState({
        showingInfo: true,
        currentMarker: marker,
        selectLoc: nextProps.selectLoc
      });
      //获取搜索列表中点击的地点并执行第三方API的查询
      let loca = nextProps.selectLoc.location;
      this.searchClick(loca);
    }
  }

  /*处理marker点击*/
  onMarkerClick = (props, marker, e) => {
    this.setState({
      showingInfo: true,
      currentMarker: marker,
      selectLoc: props
    });
    //执行第三方API查询
    if (this.state.selectLoc !== null) {
      let loca = this.state.selectLoc.position;
      this.searchClick(loca);
    }
  };

  /*通过foursquare查询相关信息（第三方API）*/
  searchClick = loca => {
    let ll = loca.lat + "," + loca.lng;
    let query = this.props.location.title;
    this.setState({ item1: {}, item2: {} });
    foursquare.venues
      .getVenues({ ll, query })
      .then(res => {
        this.setState({
          item1: res.response.venues[0],
          item2: res.response.venues[1]
        });
      })
      .catch(error => {
      	console.log(error);
        this.setState({
          errors: 'Something wrong with foursquare'
        });
      });
  };

  /*地图加载完成之后更新state*/
  mapReady = (props, map) => {
    this.setState({
      map: map
    });
  };

  /*处理地图点击*/
  mapClick = props => {
    if (this.state.showingInfo) {
      this.setState({
        showingInfo: false,
        currentMarker: null
      });
    }
  };

  render() {
    let locations = this.props.location;
    /*参考GoogleAPI文档，设置地图边界*/
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < locations.length; i++) {
      bounds.extend(locations[i].location);
    }
    //根据搜索结果，设置map center
    let center;
    if (this.props.location.length !== 0 && this.props.location.length < 9) {
      center = this.props.location[0].location;
    } else {
      center = {
        lat: 22.543096,
        lng: 114.05786499999999
      };
    }

    return (
      <Map
        google={this.props.google}
        zoom={15}
        center={center}
        style={style}
        bounds={bounds}
        onReady={this.mapReady}
        onClick={this.mapClick}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            title={loc.title}
            position={loc.location}
            ref={loc.title}
            onClick={this.onMarkerClick}
          />
        ))}
        <InfoWindow
          visible={this.state.showingInfo}
          marker={this.state.currentMarker}
        >
          <div>
            <h2>{this.state.selectLoc ? this.state.selectLoc.title : ""}</h2>
            <div>Items:</div>
            {this.state.item1 ? <p>{this.state.item1.name}</p> : "None"}
            {this.state.item2 ? <p>{this.state.item2.name}</p> : "None"}
            {this.state.errors ? <p>{this.state.errors}</p> : ""}
            <p>(These data from FourSquare.)</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAbUCvFRJ7Q68Y1fvtm1eW5zfaQsqT6FTk"
})(MapContainer);
