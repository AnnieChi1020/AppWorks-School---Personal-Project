const initialState = {
  signup: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, signup: action.data };

    default:
      return state;
  }
};

export default filterReducer;
