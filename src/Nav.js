import React, {Component} from 'react';
import ListLocations from './ListLocations';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class Nav extends Component {

	state={
		query: ''
	}

	updateQuery(query) {
		console.log(query);
		this.setState({query: query});
		this.props.queryLocation(query);
	}

	show(loc) {
		console.log(loc);
		this.props.show(loc);
	}

	render() {

		// let showLocations;
		// if(this.state.query) {
		// 	const match= new RegExp(escapeRegExp(this.state.query), 'i');
		// 	showLocations = this.props.location.filter((loc)=>match.test(loc.title));
		// }else {
		// 	showLocations=this.props.location;
		// }
		console.log(this.props.location);

		// let {location, }

		return(
			<nav className={this.props.navBar? 'navOpen' : 'nav'}>
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
				<div id="locList">				
					{this.props.location.map(loc=>(
						<li
							key={loc.title}
							onClick={()=>this.show(loc)}>
							{loc.title}
						</li>
					))}		
				</div>
			</nav>
		)
	}
}

export default Nav;