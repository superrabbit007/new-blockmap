import React , {Component} from 'react';

class ListLocations extends Component {
	render() {
		return(
			<div id="locList">				
				{this.props.location.map((loc, index)=>(
					<li
						key={index}>
						{loc.title}
					</li>
				))}		
			</div>
		) 
	}
}

export default ListLocations;