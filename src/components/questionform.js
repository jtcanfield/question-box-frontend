import React, { Component } from 'react';
import '../styles/App.css';

export default class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "",
      question: "",
      tagsinput: "",
      username: "",
      language: "",
      tags: []
    }
    this.submitquestion = this.submitquestion.bind(this);
  }
  submitquestion(event){
    event.preventDefault();
    console.log("Question Submisson fired");
    //Title to post:
    console.log(event.target.title.value);
    //Language to post:
    console.log(event.target.language.value);
    //Question to post:
    console.log(event.target.question.value);
    //Tags to post:
    console.log(event.target.tags.value);
  }
  handleTextChange = (event) => {
    event.preventDefault();
    //MAKE IT SO THAT PEOPLE CANNOT ADD THE SAME TAG TWICE
    if (this.state[event.target.id] !== undefined){
      if (event.target.id === "tagsinput"){
        if (/^[0-9a-zA-Z,-]*$/.test(event.target.value[event.target.value.length-1])) {
          this.setState({tagsinput: event.target.value});
        } else if (/^[ ]*$/.test(event.target.value[event.target.value.length-1]) && event.target.value !== " "){
          if (this.state.tags.indexOf(event.target.value.slice(0, -1)) !== -1){
            console.log("no stop");
          } else {
            this.setState(prevState => ({
                tags: [...prevState.tags, this.state.tagsinput],
                tagsinput: ""
              }))
          }
        }
        return
      } else if (event.target.id !== "tagsinput"){
        this.setState({[event.target.id]: event.target.value});
      }
    }
  }
  removetag = (event) => {
    event.preventDefault();
    this.state.tags.splice(this.state.tags.indexOf(event.target.id), 1);
    this.forceUpdate();
  }
  render() {
    let tags = this.state.tags.map((x, i) => {
      return(
        <div key={x+i} className="ask-question-tag-input">
          <span className="question-tag-span">{x}</span>
          <span className="question-x-box" id={x} onClick={this.removetag}>X</span>
        </div>
      )
    })
    return (
      <div className="body-component">
        <div className="questionform-component" >
          <form className="question-form-container" onSubmit={this.submitquestion}>
          <h2>Ask a Question!</h2>
            <label htmlFor="title">Title:</label>
            <input onChange={this.handleTextChange} type="text" id="title"
            placeholder="Title" name="title" value={this.state.title} required/><br/>

            <label htmlFor="language">Language:</label>
            <input onChange={this.handleTextChange} type="text" id="language"
            placeholder="Language" name="language" value={this.state.language} required/><br/>

            <label htmlFor="question">Question:</label>
            <textarea onChange={this.handleTextChange} type="text" id="question" className="questionform-textarea"
            placeholder="Type your question here" name="question" value={this.state.question} required/><br/>

            <label htmlFor="tags">Tags:</label>
            <input pattern="^[0-9a-zA-Z,-]*$" onChange={this.handleTextChange} type="text" id="tagsinput"
            placeholder="tags" name="tagsinput" value={this.state.tagsinput}/><br/>
            <div>
              {tags}
            </div>
            <button className="question-form-submit-button" type="submit">Submit question</button>
          </form>
        </div>
      </div>
    )
  }
}
