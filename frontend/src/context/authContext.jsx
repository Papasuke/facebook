import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

const loadUserFromSession = () => {
  try {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error loading user from session:", error);
    return null;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    ...INITIAL_STATE,
    user: loadUserFromSession(),
  });

  useEffect(() => {
    if (state.user) {
      sessionStorage.setItem("user", JSON.stringify(state.user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};