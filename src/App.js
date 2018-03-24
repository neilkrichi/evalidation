import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const ROOT_URL =  'https://api.kickbox.com/v2/verify?email='
const API_KEY = 'live_0d892a2dffcb5263b897f730128ef41a1a3164ea0d66ad3e4613583cf128dccc'
//'test_411b90ccb4724c543bb6c4e2e7ec3b80e9e8d9982ae98ec75f7d5f85f7dc3cc7'

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

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    return axios.get(`${ROOT_URL}${this.state.email}&apikey=${API_KEY}` /*, {
       crossdomain: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT',
        'Content-Type': 'application/json',
      }}*/)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("NOT WORKING");
    });
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
                <label>Email </label><br/>
                <input type ='text' name='email'
                  onBlur={this.validateEmail}
                  value={this.state.email}
                  placeholder="example@email.com"
                  onChange={this.handleInputChange}/>
              </div>
              <input type="submit" onClick={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
