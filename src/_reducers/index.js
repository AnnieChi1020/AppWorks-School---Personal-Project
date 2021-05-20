import counterReducer from "./counter.js";
import loggedReducr from "./isLogged.js";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducr,
});

export default allReducers;
