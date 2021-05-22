const initialState = {
  isLogged: false,
  userId: "",
  userRole: "",
};

const isLoggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isLogged: action.data };
    case "GET_USERID":
      return { ...state, userId: action.data };
      case "GET_USERROLE":
      return { ...state, userId: action.data };
    default:
      return state;
  }
};

export default isLoggedReducer;
