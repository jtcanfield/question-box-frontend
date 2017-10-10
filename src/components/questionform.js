import React, { Component } from 'react';
import '../styles/App.css';
import request from 'superagent';
import cookies from 'react-cookies';
import { Redirect } from 'react-router-dom';
import { loaddata, checklogin }  from './actions.js';
import {connect} from 'react-redux';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : "",
      question: "",
      tagsinput: "",
      username: "",
      language: "",
      tagerror: false,
      fireRedirect: false,
      fireRedirectPost: false,
      tags: []
    }
    this.submitquestion = this.submitquestion.bind(this);
  }
  componentWillMount(){
    this.props.update();
    this.setState({fireRedirect:false}, () => {
      request
        .post(`http://localhost:5000/checklogin`)
        .set('Authorization', cookies.load("Token"))
        .end((err,res)=>{
          if (res !== undefined){
            if (res.status !== 200 && res.statusCode !== 200){
              this.setState({fireRedirect:true});
            } else if (res.status === 200 && res.statusCode === 200){
              this.setState({fireRedirect:false});
            }
          } else {
            this.setState({fireRedirect:true});
          }
        })
    });
  }
  submitquestion(event){
    event.preventDefault();
    var newquestiondata = {
      title: this.state.title,
      language: this.state.language,
      question: this.state.question,
      tags: this.state.tags,
      user: this.props.data.username
    }
    request
      .post(`http://localhost:5000/questionpost`)
      .set('Authorization', cookies.load("Token"))
      .send(newquestiondata)
      .end((err,res)=>{
        if (res !== undefined){
          if (res.status !== 201 && res.statusCode !== 201){
            this.setState({tagerror:res.text});
          } else if (res.status === 201 && res.statusCode === 201){
            this.setState({tagerror:false, fireRedirectPost:true});
          }
        } else {
          this.setState({tagerror:"Internal Server Error"});
        }
      })
  }
  handleTextChange = (event) => {
    event.preventDefault();
    this.setState({tagerror: false});
    if (this.state[event.target.id] !== undefined){
      if (event.target.id === "tagsinput"){
        if (/^[0-9a-zA-Z,-]*$/.test(event.target.value[event.target.value.length-1])) {
          this.setState({tagsinput: event.target.value});
        } else if (/^[ ]*$/.test(event.target.value[event.target.value.length-1])
          && event.target.value !== " "){
          var valuetocheck = event.target.value.toLowerCase();
          if (this.state.tags.indexOf(valuetocheck.slice(0, -1)) !== -1){
            this.setState({tagerror: "You already have that tag!"});
          } else {
            this.setState(prevState => ({
                tags: [...prevState.tags, this.state.tagsinput.toLowerCase()],
                tagsinput: ""
              })

            )
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
            <h2>
              Ask a Question!
            </h2>
            <label htmlFor="title">
              Title:
            </label>
            <input onChange={this.handleTextChange}
              type="text" id="title"
              placeholder="Title"
              name="title"
              value={this.state.title} required/>
            <br/>
            <label htmlFor="language">
              Language:
            </label>
            <input
              onChange={this.handleTextChange}
              type="text" id="language"
              placeholder="Language"
              name="language"
              value={this.state.language} required/>
            <br/>
            <label htmlFor="question">
              Question:
            </label>
            <textarea onChange={this.handleTextChange}
              type="text" id="question"
              className="questionform-textarea"
              placeholder="Type your question here"
              name="question"
              value={this.state.question} required/>
            <br/>
            <label htmlFor="tags">
              Tags:
            </label>
            <input pattern="^[0-9a-zA-Z,-]*$"
              onChange={this.handleTextChange}
              type="text" id="tagsinput"
              placeholder="tags"
              name="tagsinput"
              value={this.state.tagsinput}/>
            <br/>
            <br/>
            {this.state.tagerror
              ? (<p className="errormessage">{this.state.tagerror}</p>)
              : ""}
            <br/>
            <div>
              {tags}
            </div>
            <button className="question-form-submit-button" type="submit">
              Submit question
            </button>
          </form>
        </div>
        {this.state.fireRedirect && (
          <Redirect to={`/login`}/>
        )}
        {this.state.fireRedirectPost && (
          <Redirect to={`/`}/>
        )}
      </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
