import React, { Component } from 'react';
import request from 'superagent';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false
    }
  }
  componentWillMount(){
    request
      .post(`http://localhost:5000/logout`)
      .set('Authorization', cookies.load("Token"))
      .end((err,res)=>{
        cookies.remove("Token");
        this.setState({fireRedirect:true});
      })
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
