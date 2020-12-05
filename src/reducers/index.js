/*
    file for combining all reducers from this project.
*/

import { combineReducers } from 'redux';

import authentication from './authentication';
import manage from './manage';
import task from './task';

export default combineReducers({
    authentication, task, manage
});