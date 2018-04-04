import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';

import reducers from './reducers'

const createStorewithMiddleware = compose(
  applyMiddleware(ReduxPromise),
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)

ReactDOM.render(
  <Provider store={createStorewithMiddleware(reducers)}>
    <App />
  </Provider>, document.getElementById('root'));
