import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginRegistrationPage from './loginregistrationpage.js';
import QuestionForm from './questionform.js';
import QuestionPage from './questionpage.js';
import Home from './home.js';
import Header from './header.js';
import Logout from './logout.js';
import Footer from './footer.js';
import React, { Component } from 'react';
import request from 'superagent';
import cookies from 'react-cookies';
import '../styles/App.css';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user: null,
      linkId: null,
    }
    this.setLinkId=this.setLinkId.bind(this)
  }
  setLinkId=(e)=>{
    console.log("e.target.id = " + e.target.id);
    this.setState({linkId: e.target.id});
  }
  componentWillMount(){
    this.checklogin();
  }
  checklogin =(event)=>{
    request
      .post(`http://localhost:5000/checklogin`)
      .set('Authorization', cookies.load("Token"))
      .end((err,res)=>{
        if (res !== undefined){
          if (res.status !== 200 && res.statusCode !== 200){
            this.setState({token:null});
          } else if (res.status === 200 && res.statusCode === 200){
            this.setState({token:res.body.session, user:res.body.username});
          }
        } else {
          this.setState({token:null});
        }
      })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="second">
            <nav>
              <Header data={this.state}/>
            </nav>
            <Switch>
              <Route path="/login" render={(props) => (<LoginRegistrationPage update={this.checklogin}/>)}  />
              <Route path="/logout" component={Logout} />
              <Route path="/addquestion" render={(props)=>(<QuestionForm update={this.checklogin} token={this.state.token} />)} />
              <Route path="/questions/" render={(props) => (<QuestionPage update={this.checklogin} token={this.state.token} linkId={this.state.linkId} />)} />
              <Route path="/" render={(props) => (<Home update={this.checklogin} setLinkId={this.setLinkId} />)} />
            </Switch>
          </div>
        </BrowserRouter>
      <Footer />
      </div>
    );
  }
}
