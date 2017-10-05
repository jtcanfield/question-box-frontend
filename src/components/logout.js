import React, { Component } from 'react';
import request from 'superagent';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletetoken: false,
      fireRedirect: false
    }
  }
  componentDidMount(){
    let cookie = {
      cookie: cookies.load("Token")
    }
    request
      .post(`http://localhost:5000/logout`)
      .send(cookie)
      .end((err,res)=>{
        this.setState({deletetoken:true});
      })
  }
  componentDidUpdate(){
    if (this.state.deletetoken){
      cookies.remove("Token");
      this.setState({fireRedirect:true});
    }
  }
  render() {
    return(
      <div>
      {this.state.fireRedirect && (
        <Redirect to={`/`}/>
      )}
      </div>
    )
  }
}
