import React, {Component} from 'react';

class Nav extends Component {
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
					<div id="locList">
					
						{this.props.location.map((loc, index)=>(
							<li
								key={index}>
								{loc.title}
							</li>
						))}
						
					</div>
				</div>
			</nav>
		)
	}
}

export default Nav;