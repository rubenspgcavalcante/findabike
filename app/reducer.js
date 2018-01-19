import { combineReducers } from 'redux';
import app from "./modules/commons/reducers/app"
import home from "./modules/home/reducers/index";

export default combineReducers({ app, home });