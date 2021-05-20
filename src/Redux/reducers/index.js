import loggedReducer from "./isLogged.js";
import signupReducer from "./signup.js";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  signup: signupReducer,
});

export default allReducers;
