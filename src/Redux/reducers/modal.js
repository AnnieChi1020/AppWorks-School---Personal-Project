const initialState = {
  signup: false,
  login: false,
  feedback: false,
  feedbackCompleted: false,
  eventId: "",
  result: false,
  resultCompleted: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, signup: action.data };
    case "LOGIN":
      return { ...state, login: action.data };
    case "SHOW_FEEDBACK":
      return { ...state, feedback: action.data };
    case "SET_FEEDBACKCOMPLETED":
      return { ...state, feedbackCompleted: action.data };
    case "SHOW_RESULT":
      return { ...state, result: action.data };
    case "SET_RESULTCOMPLETED":
      return { ...state, resultCompleted: action.data };
    case "SET_EVENTID":
      return { ...state, eventId: action.data };
    default:
      return state;
  }
};

export default filterReducer;
