import axios from "axios";

// Call API to sign in
export const callLogin = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_BEGIN" });
    try {
        const res = await axios.post("/sign-in", userCredential);
        if (res.data.success) {
            // Save user data to session
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
        }
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
};

// Call API to sign out
export const callLogout = async (dispatch) => {
  dispatch({ type: "LOGOUT_BEGIN" });
  try {
      await axios.post("/logout", {}, { withCredentials: true });
      dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (err) {
      dispatch({ type: "LOGOUT_FAILURE", payload: err });
  }
};