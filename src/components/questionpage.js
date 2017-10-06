import React, { Component } from 'react';
import '../styles/question-page.css';
import '../styles/App.css';
import Answers from './questionpage-components/answers.js';
import YourAnswer from './questionpage-components/your-answer.js';
import request from 'superagent';
import cookies from 'react-cookies';

export default class QuestionPage extends Component {
  constructor(){
    super();
    this.state = {
      data: ""
    }
  }
  handleSubmit = (e) => {
    e.prevendDefault();
    console.log(this.state);

  }
  handleTextChange = (event) => {
    event.preventDefault();
    if (this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }
  componentWillMount(){
    this.props.update();
    request
      .get(`http://localhost:5000/question/${window.location.href.split("/question/")[1]}`)
      .set('Authorization', cookies.load("Token"))
      .end((err,res)=>{
        if (err){
          console.error(err);
        } else {
          this.setState({ data:res.body });
        }
      })
  }
  render() {
    // let allAnswers = this.state.history;
    // let answers = allAnswers.map((answers)=>{
    //   console.log('Times mapped through answers: '+answers.id);
    //   return(<Answers key={answers.id} data={answers} />)
    // });

    return (
      <div className="body-component">
          <div className="questionpage-component" >
            <h1>Question Page</h1>
            <p>
              By:{this.state.data.user}
            </p>
            <p>
              Title:{this.state.data.title}
            </p>
            <p>
              Language:{this.state.data.language}
            </p>
            <p>
              Tags:{this.state.data.tags}
            </p>
            <p className="active-question-textarea">
              Question:{this.state.data.question}
            </p>
            <YourAnswer onChange={this.handleTextChange} value={this.state.answer} token={this.props.token}/>
          </div>
      </div>
    )
  }
}
