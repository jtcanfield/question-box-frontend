import React, { Component } from 'react';
import '../styles/App.css';
import request from 'superagent';
import cookies from 'react-cookies';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      name : "",
      password: "",
      secondpassword: "",
      email: "",
      fireRedirect: false,
      registrationerror: false,
    }
    this.register = this.register.bind(this);
  }
  register(event){
    event.preventDefault();
    this.setState({registrationerror:false});
    var newuserdata = {
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.secondpassword,
    }
    request
      .post(`http://localhost:5000/register`)
      .send(newuserdata)
      .end((err,res)=>{
        if (res.status !== 201 && res.statusCode !== 201){
          this.setState({registrationerror:res.text});
        } else if (res.status === 201 && res.statusCode === 201){
          cookies.save('Token', res.text);
          this.setState({registrationerror:false, fireRedirect:true});
        }
        console.log(res);
      })
  }
  handleTextChange = (event) => {
    this.setState({registrationerror:false});
    event.preventDefault();
    if (this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }
  render() {
    return (
      <div className="loginregister-form-holder">
        <form className="centered loginregister-form-container" onSubmit={this.register}>
        <h2 className="login-register-h2">Register</h2>
          <label htmlFor="username">
            Display Username:
          </label>
          <input className="centered"
            onChange={this.handleTextChange}
            type="text" id="username"
            placeholder="Username"
            name="username"
            value={this.state.username} required/>
          <br/>
          <label htmlFor="name">
            Name:
          </label>
          <input className="centered"
            onChange={this.handleTextChange}
            type="text" id="name"
            placeholder="Name"
            name="name"
            value={this.state.name} required/>
          <br/>
          <label htmlFor="password">
            Password:
          </label>
          <input className="centered"
            onChange={this.handleTextChange}
            type="password" id="password"
            placeholder="Password"
            name="password"
            value={this.state.password} required/>
          <br/>
          <label htmlFor="secondpassword">
            Re-Enter Password:
          </label>
          <input className="centered"
            onChange={this.handleTextChange}
            type="password" id="secondpassword"
            placeholder="Password Again"
            name="secondpassword"
            value={this.state.secondpassword} required/>
          <br/>
          <label htmlFor="email">
            Email:
          </label>
          <input className="centered"
            onChange={this.handleTextChange}
            type="email" id="email"
            placeholder="Email"
            name="email"
            value={this.state.email} required/>
          <br/>
          <br/>
          {this.state.registrationerror
            ? (<p className="errormessage">{this.state.registrationerror}</p>)
            : ""}
          <br/>
          <button className="loginregister-submit-button" type="submit">
            Register
          </button>
        </form>
        {this.state.fireRedirect && (
          <Redirect to={`/`}/>
        )}
      </div>
    )
  }
}
