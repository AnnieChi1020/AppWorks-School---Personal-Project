import loggedReducer from "./isLogged.js";
import signupReducer from "./signup.js";
import createEventReducer from "./createEvent";
import filterReducer from "./filter";
import modalReducer from "./modal";
import alertReducer from "./alert";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  signup: signupReducer,
  createEvent: createEventReducer,
  filter: filterReducer,
  modal: modalReducer,
  alert: alertReducer,
});

export default allReducers;
