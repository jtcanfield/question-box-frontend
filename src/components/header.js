import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header-styles.css';
import '../styles/App.css';
import HeaderGreeting from './header-components/header-greeting.js';
import HeaderLogin from './header-components/registration-login.js';
import HeaderLogout from './header-components/logout-button.js';
import HeaderSearch from './header-components/search-bar.js';
import logo from './header-components/logo.png';


export default class Header extends Component {
  render() {
    let loggedInOrOut = null;
    if ("test"==="test"){
      loggedInOrOut =
        <div className="logged-in">
          <HeaderGreeting />
          <HeaderLogout />
        </div>

    } else {
      loggedInOrOut =
      <div className="logged-out">
        <HeaderLogin />
      </div>
    }

    return(
      <div className="header-component" >
        <h1 className="header-top-logo">
          <Link to="/"><img className="header-top-logo-img" src={logo} alt="Logo"/></Link>
          <Link to="/" className="header-website-title"><div>Question Box</div></Link>
        </h1>
        <div className="header-input-field">
          <HeaderSearch />
          {loggedInOrOut}
        </div>
      </div>
    )
  }
}
