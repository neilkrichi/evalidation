import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEmailData } from './actions/index';
// import axios from 'axios';
import './App.css';

// const URL =  'https://trumail.io/json/' // 'https://api.kickbox.com/v2/verify?email='
// const API_KEY = 'live_0d892a2dffcb5263b897f730128ef41a1a3164ea0d66ad3e4613583cf128dccc'
// 'test_411b90ccb4724c543bb6c4e2e7ec3b80e9e8d9982ae98ec75f7d5f85f7dc3cc7'
const domains =  ["yahoo.com", "gmail.com", "google.com", "google.co.uk", "hotmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.com", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "att.net", "gmz.com", "mail.com"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

  }

  componentDidMount() {
    this.props.fetchEmailData('neil');
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.fetchEmailData(this.state.email);
    this.validateEmail();

    if ( this.props.emaildata.length > 0 && this.state.emailError !== 'error' ) {
      console.log(this.props.emaildata[0]);
    }
    else {
      console.log('Nope!')
    }
  }

  validateEmail(){
    if (this.state.email === '') {
      this.setState({emailError: ''})
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(this.state.email)) {
      this.setState({emailError: 'error'})
    }else{
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

  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <h1 className='app-title'>Invoice Simple Coding Challenge</h1>
        </header>
        <div className='signup'>
          <div className='page-container'>
            <form onSubmit={this.handleSubmit}>
              <div className={this.state.emailError}>
                <label>Please enter an email address:</label><br/>
                <input type ='text' name='email'
                  onBlur={this.validateEmail}
                  value={this.state.email}
                  placeholder="example@email.com"
                  onChange={this.handleInputChange}/>
              </div>
              {this.renderErrorMessage()}
              <input type="submit" onClick={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEmailData: fetchEmailData }, dispatch);
}

function mapStateToProps({ emaildata }){
    return { emaildata };
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)
