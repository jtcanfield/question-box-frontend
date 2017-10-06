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
import { selectUser }  from './actions.js';
import {connect} from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      user: null,
      linkId: null,
    }
    this.setLinkId=this.setLinkId.bind(this);
    this.clicked=this.clicked.bind(this);
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
            this.setState({token:res.body.session, user:res.body.username}, () =>{
              // console.log(this.state.token);
            });
          }
        } else {
          this.setState({token:null});
        }
      })
  }
  clicked(event){
    console.log(this.props);
    this.props.selectUser(this.state.token);
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="second">
            <nav>
              <Header
              data={this.state}/>
            </nav>
            <Switch>
              <Route path="/login" render={(props) => (<LoginRegistrationPage update={this.checklogin}/>)}  />
              <Route path="/logout" component={Logout} />
              <Route path="/addquestion" render={(props)=>(<QuestionForm update={this.checklogin} token={this.state.token} />)} />
              <Route path="/questions/" render={(props) => (<QuestionPage update={this.checklogin} token={this.state.token} linkId={this.state.linkId} />)} />
              <Route path="/" render={(props) => (<Home clicked={this.clicked} update={this.checklogin} setLinkId={this.setLinkId} />)} />
            </Switch>
          </div>
        </BrowserRouter>
      <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //what is returned will show up as props inside of the UserList container
  //inside of this function we generally return an object
  console.log(state);
  return {
    // users: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  // whenever selectUser is called, the result should be passed to
  // the reducer.
    return {
      selectUser: user => {
        dispatch(selectUser(user))
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
