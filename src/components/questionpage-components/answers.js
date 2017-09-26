import React, { Component } from 'react';
import '../../styles/question-page.css';

export default class Answers extends Component {

  render() {
    console.log(this.props.data);
    return (
      <div className="answer-component" key={this.props.data.answerId}>
        <div className="answer-attribution">
          <div>Answer {this.props.data.answerId}</div>
          <div>by {this.props.data.user}</div>
        </div>
        <div className="answer-body">
          <textarea readOnly value={this.props.data.answer}/>
        </div>
      </div>
    )
  }
}
