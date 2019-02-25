import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import quiz from './quiz';

export default combineReducers({
    auth: auth,
    errors: errors,
    quiz: quiz
});