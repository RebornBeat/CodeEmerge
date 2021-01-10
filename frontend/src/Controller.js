import React, { Component } from 'react';
import App from './App';
import Portal from './Portal';

export default class Controller extends Component {
	constructor(props) {
	super(props);
	this.state = {component: "App", key: ""};
	}
	
	callbackFunction = (componentName) => {
		
		if ( componentName != "Refresh") {
			this.setState({component: componentName});
		}

	}
	
	render() {
		
		return (
			<>
				{ this.state.component == "App" && <App parentCallback = {this.callbackFunction} /> }
				{ this.state.component == "Navbar-Portal" && <Portal parentCallback = {this.callbackFunction} /> }
			</>
		);
	
	}
}