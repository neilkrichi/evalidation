import { combineReducers } from 'redux';
import EmailDataReducer from './reducer_email';

const rootReducer = combineReducers({
  emaildata: EmailDataReducer,
});

export default rootReducer;
