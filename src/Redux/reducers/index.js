import loggedReducer from "./isLogged.js";
import filterReducer from "./filter";
import modalReducer from "./modal";
import expandedReducer from "./expanded";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  filter: filterReducer,
  modal: modalReducer,
  expanded: expandedReducer,
});

export default allReducers;
