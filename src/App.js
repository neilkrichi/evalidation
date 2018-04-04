import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEmailData } from './actions/index';
// import axios from 'axios';
import './App.css';

// const URL =  'https://trumail.io/json/' // 'https://api.kickbox.com/v2/verify?email='
// const API_KEY = 'live_0d892a2dffcb5263b897f730128ef41a1a3164ea0d66ad3e4613583cf128dccc'
// 'test_411b90ccb4724c543bb6c4e2e7ec3b80e9e8d9982ae98ec75f7d5f85f7dc3cc7'
// const domains =  ["yahoo.com", "gmail.com", "google.com", "google.co.uk", "hotmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.com", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "att.net", "gmz.com", "mail.com"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      message: '',
      email: '',
      display: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmailFormat = this.validateEmailFormat.bind(this);
  }

  handleChange(e) {
    this.setState({email: [e.target.value]});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.email === '') {
      this.setState({emailError: ''})
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(this.state.email)) {
      this.setState({emailError: 'error'})
    }
    else {
      this.setState({emailError: 'nice'})
      this.handleFormSubmit();
    }
  }

  handleFormSubmit() {
    this.props.fetchEmailData(this.state.email);
    this.setState({email:''})
    console.log(this.props.emaildata[0]);
  }

  validateEmailFormat() {
    if (this.state.email === '') {
      this.setState({emailError: ''})
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(this.state.email)) {
      this.setState({emailError: 'error'})
    }
    else {
      this.setState({emailError: 'nice'})
    }
  }

  renderErrorMessage() {
    if (this.state.emailError === 'error') {
      return (
        <p>Please enter a valid email format.</p>
      )
    }
  }

  renderEmailStatus() {
    const emailData = this.props.emaildata[0];

    if (emailData !== undefined) {
      if (emailData.deliverable === true) {
        return(
          <div className={this.state.display}>
            <p>your email address can be delivered to</p>
            <button onClick={() => {this.setState({display: 'hidden'})}}>got it</button>
          </div>
        )
      }
      else if (emailData.deliverable === false)  {
        return(
          <div>
            <p>your email address cannot be delivered to</p>
          </div>
        )
      }
    }
  }
  
  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <h1 className='app-title'>Invoice Simple Coding Challenge</h1>
          <p>by Neil Krichi</p>
        </header>
        <div className='signup'>
          <div className='page-container'>
            <form onSubmit={this.handleSubmit}>
              <div className={this.state.emailError}>
                <input type ='text' name='email'
                  value={this.state.email}
                  placeholder="example@email.com"
                  onBlur={this.validateEmailFormat}
                  onChange={this.handleChange}/>
                {this.renderErrorMessage()}
              </div>
              <input type="submit" onClick={this.validateEmail} />
            </form>
            {this.renderEmailStatus()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ emaildata }){
    return { emaildata };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEmailData: fetchEmailData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
