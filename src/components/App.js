import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginRegistrationPage from './loginregistrationpage.js';
import QuestionForm from './questionform.js';
import QuestionPage from './questionpage.js';
import Home from './home.js';
import Header from './header.js';
import Logout from './logout.js';
import Footer from './footer.js';
import React, { Component } from 'react';
import cookies from 'react-cookies';
import '../styles/App.css';
import { loaddata, checklogin }  from './actions.js';
import {connect} from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = {
      linkId: null,
    }
    this.setLinkId=this.setLinkId.bind(this);
  }
  setLinkId=(e)=>{
    console.log("e.target.id = " + e.target.id);
    this.setState({linkId: e.target.id});
  }
  componentWillMount(){
    this.checklogin();
  }
  componentDidMount(){
    this.checklogin();
  }
  checklogin =(event)=>{
    this.props.checklogin(cookies.load("Token"));
    this.props.loaddata(cookies.load("Token"));
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="second">
            <nav>
              <Header
              data={this.props.userdata}/>
            </nav>
            <Switch>
              <Route path="/login" render={(props) => (<LoginRegistrationPage update={this.checklogin}/>)}  />
              <Route path="/logout" component={Logout} />
              <Route path="/addquestion" render={(props)=>(<QuestionForm update={this.checklogin}/>)} />
              <Route path="/question/:id" render={(props) => (<QuestionPage update={this.checklogin}/>)} />
              <Route path="/" render={(props) => (<Home update={this.checklogin}/>)} />
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
  if (state === undefined){
    state = '';
  }
  return {
    usertoken: state.activeUser,
    userdata: state.username,
  };
}

function mapDispatchToProps(dispatch) {
  // whenever selectUser is called, the result should be passed to
  // the reducer.
    return {
      loaddata: datatodisptach => {
        dispatch(loaddata(datatodisptach))
      },
      checklogin: datatodisptach => {
        dispatch(checklogin(datatodisptach))
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
