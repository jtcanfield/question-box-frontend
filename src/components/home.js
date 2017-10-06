import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';
import request from 'superagent';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      testdata: false
    };
  }
  componentWillMount(){
    this.props.update();
    request
      .get('https://secure-beyond-80954.herokuapp.com/questions')
      .end((err,res) => {
        // this.setState({testdata: JSON.parse(res.text)});
      })
    request
      .get('http://localhost:5000/questions')
      .end((err,res) => {
        this.setState({testdata: JSON.parse(res.text)});
      })
  }
  render(){
    let questionLink;
    if(this.state.testdata){
      questionLink = this.state.testdata.map((question) =>{
        return(
          <a key={question._id}
            className="centered">
            <br/>
            <Link to={"/question/"+question._id}>
              {question.title}
            </Link>
            <br/>
          </a>
        )
      })
    };
    return (
      <div className="body-component">
        <div className="home-component" >
          <h1 className="centered homepage-welcome-header">
            Welcome to Question Box!
          </h1>
          <div className="homepage-container">
            <div className="popular-tags-homepage">
              <h3 className="centered">
                Popular Tags:
              </h3>
            </div>
            <div className="recently-asked-questions-homepage">
              <h3 className="centered">
                Recently Asked Questions:
              </h3>
              <button className="homepage-ask-a-question-button">
                <Link to="/addquestion">
                  Ask a Question!
                </Link>
              </button>
              {questionLink}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
