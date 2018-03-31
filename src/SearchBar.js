import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEmailData } from './actions/index';

import './App.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }


    handleChange(e) {
      this.setState({email: [e.target.value]});
    }

    handleSubmit(e) {
      e.preventDefault();
    }

    validateEmail(){
      if (this.state.email === '') {
        this.setState({emailError: ''})
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,9}$/i.test(this.state.email)) {
        this.setState({emailError: 'error'})
      }
      else {
        this.setState({emailError: 'nice'})
        this.props.fetchEmailData(this.state.email);
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
      <form onSubmit={this.handleSubmit}>
        <div className={this.state.emailError}>
          <label>Please enter an email address:</label><br/>
          <input type ='text' name='email'
            value={this.state.email}
            placeholder="example@email.com"
            onChange={this.handleChange}/>
        </div>
        {this.renderErrorMessage()}
        <input type="submit" onClick={this.validateEmail} />
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEmailData: fetchEmailData }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar)
