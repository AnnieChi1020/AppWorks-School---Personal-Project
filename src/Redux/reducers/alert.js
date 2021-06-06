const initialState = {
  loginAlert: false,
};

const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOGINALERT":
      return { ...state, loginAlert: action.data };

    default:
      return state;
  }
};

export default AlertReducer;
