const initialState = {
  tag: "",
  city: "",
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return { ...state, tag: action.data };
    case "ADD_CITY":
      return { ...state, city: action.data };

    default:
      return state;
  }
};

export default filterReducer;
