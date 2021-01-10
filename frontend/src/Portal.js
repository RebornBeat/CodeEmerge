import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Portal.css';

export class LoginPortal extends Component {
	constructor(props) {
	super(props);
	this.state = { Uname: "", Pass: "" };
	}
	
	
	sendData = (e) => {
			this.props.parentCallback(e);
		}
		
	handleChange (e) {
		
		if ( e.target.id === "Login_Wrapper_Uname" ) {
			this.setState({Uname: e.target.value})
		}
		
		if ( e.target.id === "Login_Wrapper_Pass" ) {
			this.setState({Pass: e.target.value})
		}
		
	}
	
	handleClick (e) {
		if ( e.target.id  === "Login_Wrapper_Submit" ) {
			let data = {Uname: this.state.Uname, Pass: this.state.Pass};
			axios.post(`/login/`, { data }).then((res) =>  {
				alert(res.data.details);
				if ( res.data.details === "accepted" ){
					this.sendData("Accepted")
				}
			})
		}
	
		
	}
	
	render() {
		return (
		
			<>
			
				<div id="Login_Wrapper">
					<span id="Login_Wrapper_Title">Login</span>
					<div id="Login_Input_Wrapper">
						<div className="Login_Wrapper_Input">
							<input type="text" className="Login_Input" id="Login_Wrapper_Uname" placeholder="Username" onChange={this.handleChange.bind(this)} required ></input>
						</div>
						<div className="Login_Wrapper_Input">
							<input type="password" className="Login_Input" id="Login_Wrapper_Pass" placeholder="Password" onChange={this.handleChange.bind(this)} required ></input>
						</div>
					</div>
					<div id="Login_Wrapper_Submit" onClick={this.handleClick.bind(this)}>Enter</div>
				</div>
				<div id="Register_Link" onClick={this.sendData.bind(this)}><span id="Register">Register</span></div>

			</>
		);
	}
}


export class RegisterPortal extends Component {
	constructor(props) {
	super(props);
	this.state = { Uname: "",  Pass: "", rePass:"" };
	}
	
	
	sendData = (e) => {
			 this.props.parentCallback(e);
		}
		
	handleChange (e) {
		
		if ( e.target.id === "Login_Wrapper_Uname" ) {
			this.setState({Uname: e.target.value})
		}
		
		if ( e.target.id === "Login_Wrapper_Pass" ) {
			this.setState({Pass: e.target.value})
		}
		
		if ( e.target.id === "Login_Wrapper_rePass" ) {
			this.setState({rePass: e.target.value})
		}
		
	}
	
	handleClick (e) {
		let data = {Uname: this.state.Uname, Pass: this.state.Pass, rePass: this.state.rePass};
		axios.post(`/register/`, { data }).then((res) =>  {
			alert(res.data.details);
			if ( res.data.details === "accepted" ){
				this.sendData("Accepted")
			}
		})
	}
	
	render() {
		return (
			<>
			
				<div id="Login_Wrapper">
					<span id="Login_Wrapper_Title">Register</span>
					<div id="Register_Input_Wrapper">
						<div className="Login_Wrapper_Input">
							<input type="text" className="Login_Input" id="Login_Wrapper_Uname" placeholder="Username" onChange={this.handleChange.bind(this)} required ></input>
						</div>
						<div className="Login_Wrapper_Input">
							<input type="password" className="Login_Input" id="Login_Wrapper_Pass" placeholder="Password" onChange={this.handleChange.bind(this)} required ></input>
						</div>
						<div className="Login_Wrapper_Input">
							<input type="password" className="Login_Input" id="Login_Wrapper_rePass" placeholder="Re-enter Password" onChange={this.handleChange.bind(this)} required ></input>
						</div>
					</div>
					<div id="Register_Wrapper_Submit" onClick={this.handleClick.bind(this)}>Enter</div>
				</div>

			</>
		);
	}
}


export default class Portal extends Component {
	constructor(props) {
	super(props);
	this.state = { component: "Login"};
	}
	
	sendData = (e) => {
		this.props.parentCallback(e);
		
	}
	
	callbackFunction = (componentName) => {
		
		this.setState({component: componentName});
	}
	
	render() {
		
		return (
			<>
				<Navbar parentCallback = {this.callbackFunction} />
				{ this.state.component === "Login" && <LoginPortal parentCallback = {this.callbackFunction} /> }
				{ this.state.component === "Register" && <RegisterPortal  parentCallback = {this.callbackFunction} /> }
			</>
		);
	
	}
}