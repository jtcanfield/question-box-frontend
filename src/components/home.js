import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testdata: false
    };
  }
  componentWillMount(){
    // fetch('https://memorygameapi.herokuapp.com/stats').then(results => {
    //   return results.json();
    // }).then(data => {
    //   this.setState({ testdata: data})
    // })
  }
  render() {
    // console.log(this.state.testdata);
    return (
      <div className="home-component" >
        <h1 className="homepage-welcome-header">Welcome to Question Box!</h1>
        <button className="homepage-ask-a-question-button"><Link to="/login">LOGIN TEST</Link></button>
          <div className="homepage-container">
            <div className="popular-tags-homepage">
              <h3>Popular Tags:</h3>
            </div>
            <div className="recently-asked-questions-homepage">
              <button className="homepage-ask-a-question-button"><Link to="/addquestion">Add a Question</Link></button>
              <h3>Recently Asked Questions:</h3>
            </div>
          </div>
      </div>
    )
  }
}
