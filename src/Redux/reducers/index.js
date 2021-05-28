import loggedReducer from "./isLogged.js";
import signupReducer from "./signup.js";
import createEventReducer from "./createEvent";
import filterReducer from "./filter";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  signup: signupReducer,
  createEvent: createEventReducer,
  filter: filterReducer,
});

export default allReducers;
