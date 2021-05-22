const initialState = {
  eventId: "",
  eventTitle: "",
  eventContent: "",
  eventAddress: {},
  eventCoverImage: "",
  startTime: {},
  endTime: {},
  eventStatus: 0,
  eventTags: [],
  hosterId: "",
  resultImage: [],
  resultContent: "",
};

const isLoggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ID":
      return { ...state, eventId: action.data };
    case "ADD_TITLE":
      return { ...state, eventTitle: action.data };
    case "ADD_CONTENT":
      return { ...state, eventContent: action.data };
    case "ADD_ADDRESS":
      return { ...state, eventAddress: action.data };
    case "ADD_COVERIMAGE":
      return { ...state, eventCoverImage: action.data };
    case "ADD_STARTTIME":
      return { ...state, startTime: action.data };
    case "ADD_ENDTIME":
      return { ...state, endTime: action.data };
    case "ADD_TAGS":
      return { ...state, eventTags: action.data };
    case "ADD_HOSTERID":
      return { ...state, hosterId: action.data };
    default:
      return state;
  }
};

export default isLoggedReducer;
