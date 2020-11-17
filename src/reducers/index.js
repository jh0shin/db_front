/*
    file for combining all reducers from this project.
*/

import { combineReducers } from 'redux';

import authentication from './authentication';

export default combineReducers({
    authentication
});