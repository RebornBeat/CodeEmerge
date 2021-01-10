import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import timer from './timer.svg';
import './App.css';
import Navbar from './Navbar';

export class CourseSelection extends Component {
	
	sendData = (e) => {
			 this.props.parentCallback(e.target.className, e.target.value);
		}
	
	render() {
		//  Assign each role in props.registered to roleList, if in tags then add to filteredRole assuring that role is available.
		let roleList = [ ]
		let filteredRole = [ ]
		
		let dataList = Object.entries(this.props.data.tags.registered).map(([key, value]) => {
			
			let userList = value.map((userKey) => {
				
				return (
					<span className="Role_User">{userKey}</span>
				);
				
			});
			
			roleList.push(key)
			
			return (
				<div className="Role_Wrapper"> 
					<span className="Role_Title">{key}: </span>
					{userList}
				</div>
			);
			
			
		});
					
		let roleStatus = undefined;
		
		// Map through this.props.tags and see if 
		
		let tagKeys = Object.entries(this.props.data.tags).map(([key, value]) => {
			return (
				key
			)
		});
		
		roleList.map((userKey) => {
			if ( tagKeys.includes(userKey) ) {
				filteredRole.push(userKey)
			}
		});
		
		this.props.arr.map((userKey) => {
				
			if ( filteredRole.includes(userKey) ) {
				roleStatus = true
			}
			
		});
		
		let arrMap = filteredRole.map((userKey) => {
			
			return (
				<option value={userKey}>{userKey}</option>
			);
			
		});
		
		
		return (
		
			<>
				<h2 id="Selected_Title">{this.props.data.title}</h2>
				<div id="Selected_Description">
					
				</div>
				<div id="Selected_Length_Wrapper">
					<img src={timer} alt="Deadline"/>
					<span id="Selected_Length">{this.props.data.startDate}</span>
				</div>
				{dataList}
				{ roleStatus != true && 
					<>
						<div id="Role_Select_Wrapper">
							<label for="Roles">Select a Role: </label>
							<select className="Role_Select" id="Roles" onChange={this.sendData.bind(this)}>
								<option value="n/a">Role</option>
								{arrMap}
							</select>
						</div>
					</>
				}
				<div className="Selected_Button_Wrapper" id={this.props.id} onClick={this.sendData.bind(this)}>Enroll</div>
			</>
		);
	
	}
	
}

export class CourseDisplay extends Component {
	
	sendData = (e) => {
			 this.props.parentCallback(e.target.className, e.target.id);
		}

	render() {
		
		let dataList = Object.entries(this.props.data).map(([key, value]) => {
			return (
				<div className="Course_Wrapper">
					<div className="Course_Title_Wrapper">
						<span>{value.title}</span>
					</div>
					<div className="Course_Slot_Wrapper">
						<span>{value.filledSlot}/{value.maxSlot}</span>
					</div>
					<div className="Course_Date_Wrapper">
						<span>{value.startDate}</span>
					</div>
					<div className="Course_Button_Wrapper" id={key} onClick={this.sendData.bind(this)}>Select</div>
				</div>
			);
		});
		
		return (
			<>
				<div id="Course_Header_Wrapper">
					<div id="Header_Title_Wrapper">Title</div>
					<div id="Header_Slot_Wrapper">Slot</div>
					<div id="Header_Length_Wrapper">Length</div>
				</div>
				{dataList}
			</>
		);
	}
}

export class FieldSelection extends Component {
	
	sendData = (e) => {
			 this.props.parentCallback(e.target.value, e.target.id);
		}
	
	render() {
		return (
			<select className="Course_Selection" id="Field_Selection" onChange={this.sendData.bind(this)}>
				<option value="n/a">Field</option>
				<option value="web">Web Development</option>
				<option value="gaming">Gaming</option>
				<option value="ai">AI</option>
			</select>
		);
	}
}

export class FullStackSelection extends Component {
	
	
	sendData = (e) => {
			 this.props.parentCallback(e.target.value, e.target.id);
		}
	
	render() {
		return (
			<select className="Course_Selection" id="Full_Stack_Selection" onChange={this.sendData.bind(this)}>
				<option value="full_stack">Full-Stack</option>
				<option value="back_end">Back-End</option>
				<option value="front_end">Front-End</option>
			</select>
		);
	}
}

export class LanguageSelection extends Component {
	
	sendData = (e) => {
			 this.props.parentCallback(e.target.value, e.target.id);
		}
	
	render() {
		
		return (
			<select className="Course_Selection" id="Language_Selection" onChange={this.sendData.bind(this)}>
				<option value="n/a">Language</option>
				<option value="c++">C++</option>
				<option value="python">Python</option>
				<option value="java">Java</option>
			</select>
		);
	}
}

// TODO: Depending on Stack display Front-End Language or Back-End or Both

export default class App extends Component {
	constructor(props) {
	super(props);
	this.state = {role: "n/a", field: "n/a", stack: "n/a", language: "n/a", resData: "n/a", callback: "n/a", component: "App", uid: "n/a", selectedRole: "Designer" };
	}
		
	getCookie = (name) => {
		let cookieValue = null;
		console.log(document.cookie)
		if (document.cookie && document.cookie !== '') {
			const cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	
	callbackFunction = (value, id) => {
		
		  if ( id == "Field_Selection" ) {
			  this.setState({field: value, stack: "n/a", language: "n/a", callback: "tags", component: "App"});
		  }
		  
		  if ( id == "Full_Stack_Selection" ) {
			  this.setState({stack: value, language: "n/a", callback: "tags", component: "App"});
		  }
		  
		  if ( id == "Language_Selection" ) {
			  this.setState({language: value, callback: "tags", component: "App"});
		  }
		
		  if ( value == "Course_Button_Wrapper" ) {
			  this.setState({component: "SelectedCourse", resData: this.state.resData[id],callback: "n/a", uid: id});
		  }
		  
		  if ( value == "Selected_Button_Wrapper" ) {
			  this.setState({callback: "selected"});
		  }
		  
		  if (  value == "Role_Select" ) {
			  this.setState({selectedRole: id, callback: "n/a"});
		  }
		  
		  if (  id == "Navbar-Portal" ) {
			  this.props.parentCallback("Navbar-Portal");
		  }
		  
		  
	}

	handleChange (e) {
		this.setState({role: e.target.value, stack: "n/a", field: "n/a", language: "n/a", callback: "tags", component: "App" });
	}
	
	componentDidUpdate() {
		
		let csrftoken = this.getCookie('csrftoken');
		
		if ( this.state.callback == "tags" ){
			let data = {role:this.state.role, field:this.state.field, stack:this.state.stack, language:this.state.language};
			// if value != N/A make a FETCH post for all non N/A values
			axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
			axios.post(`/filter/`, { data }).then((res) =>  {
				this.setState({ resData: res.data, callback: "post" })
			})
		}
			
		if ( this.state.callback == "selected" ){
			
			let data = {id:this.state.uid, role: this.state.selectedRole};
			console.log(data)
			
			// POST Role and Course ID
			axios.defaults.headers.common["X-CSRFToken"] = csrftoken;
			axios.post(`/join/`, { data }).then((res) =>  {
				this.setState({callback: "post" })
			})
			
			
		}
	}
  
	render() {
		
		let selectionArr = [ this.state.role, this.state.language ]
		
		return (
			<>
				<Navbar parentCallback = {this.callbackFunction} />
				<div id="Home_Course">
					<h1 id="Course_Title">
					  Find a Team to Work On Real World Projects
					</h1>
					<div id="Course_Selection_Wrapper">
						<select className="Course_Selection" id="Role_Selection" onChange={this.handleChange.bind(this)}>
							<option value="n/a">Role</option>
							<option value="Designer">Designer</option>
							<option value="developer">Developer</option>
						</select>
						{ (this.state.role === "designer" || this.state.role === "developer" ) && <FieldSelection parentCallback = {this.callbackFunction} key = {this.state.role}/> }
						{ this.state.role === "developer" && <FullStackSelection parentCallback = {this.callbackFunction}  key = {this.state.field}/> }
						{ ( this.state.role === "developer" && this.state.stack != "n/a" ) && <LanguageSelection parentCallback = {this.callbackFunction} key = {this.state.stack}/> }
					</div>
					<div id="Course_Display_Wrapper">
						{ ( this.state.resData != "n/a" && this.state.component == "App" ) && <CourseDisplay data = {this.state.resData} parentCallback = {this.callbackFunction} /> }
						{ this.state.component == "SelectedCourse" && <CourseSelection arr = {selectionArr} data = {this.state.resData} id = {this.state.uid} parentCallback = {this.callbackFunction} /> }
					</div>
				</div>
			</>
		);
	}
}

