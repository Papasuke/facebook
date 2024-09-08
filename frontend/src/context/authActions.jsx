export const loginBegin = (userCredentials) => ({
    type: "LOGIN_BEGIN",
})

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const loginFailure = () => ({
    type: "LOGIN_FAILURE",
})