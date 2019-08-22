import {combineReducers} from 'redux';
import authuser from './authU';
import profile from './profile';

const rootReducer= combineReducers({
    auth: authuser,
    updated_msg:profile

});


export default rootReducer;