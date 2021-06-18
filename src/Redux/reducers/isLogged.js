const initialState = {
  isLogged: null,
  userId: null,
  userRole: null,
};

const isLoggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isLogged: action.data };
    case "GET_USERID":
      return { ...state, userId: action.data };
    case "GET_USERROLE":
      return { ...state, userRole: action.data };
    default:
      return state;
  }
};

export default isLoggedReducer;
