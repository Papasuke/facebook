const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_BEGIN":
        return { ...state, isFetching: true, error: false };
      case "LOGIN_SUCCESS":
        return { ...state, isFetching: false, user: action.payload };
      case "LOGIN_FAILURE":
        return { ...state, isFetching: false, error: action.payload };
      case "LOGOUT_BEGIN":
        return { ...state, isFetching: true, error: false };
      case "LOGOUT_SUCCESS":
        return { ...state, isFetching: false, user: null };
      case "LOGOUT_FAILURE":
        return { ...state, isFetching: false, error: action.payload };
      default:
        return state;
    }
};

export default AuthReducer;