import React, {Component} from 'react';
import ListLocations from './ListLocations';

class Nav extends Component {



	updateQuery(query) {
		if(query.trim() !== '') {
			this.props.queryLocation(query);
		}
	}

	render() {


		return(
			<nav className="">
				<div>
					<h2>ShenZhen Locations</h2>
					<div id="searchBox">
						<input
							id="address"
							type="text" 
							
							placeholder="Station location"
							onChange={(event)=>this.updateQuery(event.target.value)}/>
						<button className="filter">Filter</button>
					</div>
					<ListLocations
						location={this.props.location}/>
				</div>
			</nav>
		)
	}
}

export default Nav;