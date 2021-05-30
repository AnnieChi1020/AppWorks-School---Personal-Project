const initialState = {
  signup: false,
  login: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, signup: action.data };
    case "LOGIN":
      return { ...state, login: action.data };
    default:
      return state;
  }
};

export default filterReducer;
