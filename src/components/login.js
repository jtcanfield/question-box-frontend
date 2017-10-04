import React, { Component } from 'react';
import '../styles/App.css';
import request from 'superagent';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginerror: false,
      fireRedirect: false,
    }
    this.login = this.login.bind(this);
  }
  login(event){
    event.preventDefault();
    this.setState({loginerror:false});
    var userlogindata = {
      username: this.state.username,
      password: this.state.password
    }
    request
      .post(`http://localhost:5000/login`)
      .set('Authorization', cookies.load("Token"))
      .send(userlogindata)
      .end((err,res)=>{
        if (res !== undefined){
          if (res.status !== 201 && res.statusCode !== 201){
            this.setState({loginerror:res.text});
          } else if (res.status === 201 && res.statusCode === 201){
            cookies.save('Token', res.text);
            this.setState({loginerror:false, fireRedirect:true});
          }
        } else {
          this.setState({loginerror:"Internal Server Error"});
        }
      })
  }
  handleTextChange = (event) => {
    event.preventDefault();
    if (this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  render() {
    return (
      <div className="loginregister-form-holder">
        <form className="centered loginregister-form-container" onSubmit={this.login}>
        <h2 className="centered login-register-h2">Login</h2>
          <label htmlFor="username">Username:</label>
          <input className="centered" onChange={this.handleTextChange} type="text" id="username"
          placeholder="Username" name="username" value={this.state.username} required/><br/>
          <label htmlFor="password">Password:</label>
          <input className="centered" onChange={this.handleTextChange} type="password" id="password"
          placeholder="Password" name="password" value={this.state.password} required/><br/>
          <button className="loginregister-submit-button" type="submit">Login</button>
          {this.state.loginerror
            ? (<p className="errormessage">{this.state.loginerror}</p>)
            : ""}
        </form>
        {this.state.fireRedirect && (
          <Redirect to={`/`}/>
        )}
      </div>
    )
  }
}
