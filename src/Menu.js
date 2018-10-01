import React , {Component} from 'react';
import './App.css';


class Menu extends Component {
	render() {
		return(
			<div id="menu">
				<button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse"
					onClick={()=>this.showNav()}>
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>
				  <span className="icon-bar"></span>
				</button>
			</div>
		)
	}
}

export default Menu;