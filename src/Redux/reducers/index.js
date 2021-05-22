import loggedReducer from "./isLogged.js";
import signupReducer from "./signup.js";
import createEventReducer from "./createEvent";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  signup: signupReducer,
  createEvent: createEventReducer,
});

export default allReducers;
