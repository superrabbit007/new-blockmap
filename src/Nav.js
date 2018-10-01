import React, {Component} from 'react';
import ListLocations from './ListLocations';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class Nav extends Component {

	state={
		query: ''
	}

	updateQuery(query) {
		this.setState({query: query});
		// if(query.trim() !== '') {
		// 	this.props.queryLocation(query);
		// }
	}

	render() {

		let showLocations;
		if(this.state.query) {
			const match= new RegExp(escapeRegExp(this.state.query), 'i');
			showLocations = this.props.location.filter((loc)=>match.test(loc.title));
		}else {
			showLocations=this.props.location;
		}

		return(
			<nav className={this.props.navBar? 'navOpen' : 'nav'}>
				<div>
					<h2>ShenZhen Locations</h2>
					<div id="searchBox">
						<input
							id="address"
							type="text" 
							value={this.state.value}
							placeholder="Station location"
							onChange={(event)=>this.updateQuery(event.target.value)}/>
						<button className="filter">Filter</button>
					</div>
					<ListLocations
						location={showLocations}/>
				</div>
			</nav>
		)
	}
}

export default Nav;