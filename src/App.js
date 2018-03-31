import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import SearchBar from './SearchBar'
import './App.css';

// const URL =  'https://trumail.io/json/' // 'https://api.kickbox.com/v2/verify?email='
// const API_KEY = 'live_0d892a2dffcb5263b897f730128ef41a1a3164ea0d66ad3e4613583cf128dccc'
// 'test_411b90ccb4724c543bb6c4e2e7ec3b80e9e8d9982ae98ec75f7d5f85f7dc3cc7'
// const domains =  ["yahoo.com", "gmail.com", "google.com", "google.co.uk", "hotmail.com", "me.com", "aol.com", "mac.com", "live.com", "comcast.com", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk", "facebook.com", "verizon.net", "att.net", "gmz.com", "mail.com"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  renderEmailStatus() {
    const emailData = this.props.emaildata[0];

    if (emailData !== undefined) {
      if (emailData.deliverable === true) {
        return(
          <div>
            <p>your email address can be delivered to</p>
          </div>
        )
      }
      else {
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
        </header>
        <div className='signup'>
          <div className='page-container'>
            <SearchBar />
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

export default connect(mapStateToProps)(App)
