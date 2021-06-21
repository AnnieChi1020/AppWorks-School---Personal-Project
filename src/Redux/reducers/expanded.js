const initialState = {
  collapseNav: false,
};

const expandedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NAV":
      return { ...state, collapseNav: action.data };

    default:
      return state;
  }
};

export default expandedReducer;
