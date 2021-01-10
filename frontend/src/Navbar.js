import './Navbar.css';
import React, { Component } from 'react';

export default class Navbar extends Component {
	
	sendData = (e) => {
			 this.props.parentCallback(e.target.value, e.target.id);
		}
		
	render() {
		return (
			<div id="Navbar">
				<div id="Navbar-Right">
					<button type="button" id="Navbar-Portal" onClick={this.sendData.bind(this)} >Portal</button>
				</div>
			</div>
		);
	}
}

 