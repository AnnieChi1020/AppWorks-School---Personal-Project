const initialState = {
  participantId: "",
  participantName: "",
  participantPhone: "",
  participantEmail: "",
  participantStatus: 0,
  participantAttended: false,
  participantComment: "",
  participantRating: 0,
  eventId: "",
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NAME":
      return { ...state, participantName: action.data };
    case "ADD_PHONE":
      return { ...state, participantPhone: action.data };
    case "ADD_EMAIL":
      return { ...state, participantEmail: action.data };
    case "ADD_USERID":
      return { ...state, participantId: action.data };
    case "ADD_EVENTID":
      return { ...state, eventId: action.data };

    default:
      return state;
  }
};

export default signupReducer;
