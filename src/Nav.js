import React, {Component} from 'react';
import './App.css';

class Nav extends Component {

/*搜索列表实时更新（地址列表和地图marker）*/
	updateQuery(query) {
		this.props.queryLocation(query);
	}

/*展示点击的地点marker及信息*/
	show(loc) {
		console.log(loc);
		this.props.showClickLoc(loc);
	}

	render() {

		return(
			<nav className={this.props.navBar? 'navOpen' : 'nav'}>
				<h2>ShenZhen Locations</h2>
				<div id="searchBox">
					<input
						id="address"
						type="text" 
						placeholder="Station location"
						aria-label="Search"
						onChange={(event)=>this.updateQuery(event.target.value)}/>
						<span>filter</span>
				</div>
				<div id="locList">				
					{this.props.location.map(loc=>(
						<li
							role="button"
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