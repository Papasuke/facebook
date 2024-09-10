import axios from "axios";
import { toast } from "react-hot-toast";

// Call API to sign in
export const callLogin = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_BEGIN" });
    try {
        const res = await axios.post("/auth/sign-in", userCredential, { withCredentials: true });
        if (res.data.success) {
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
            toast.error(`Error: ${res.data.message}`);
        }
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message || err.message });
        toast.error(`Error: ${err.response?.data?.message || err.message}`);
    }
};

// Call API to sign out
export const callLogout = async (dispatch) => {
    dispatch({ type: "LOGOUT_BEGIN" });
    try {
        await axios.post("/auth/logout", {}, { withCredentials: true });
        sessionStorage.removeItem("user"); 
        dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (err) {
        dispatch({ type: "LOGOUT_FAILURE", payload: err.message });
        console.error('Logout error:', err);
        toast.error(`Error: ${err.message}`);
    }
};

// Call API to create a post
export const callCreatePost = async (postData, dispatch) => {
    dispatch({ type: "POST_BEGIN" });
    try {
        const res = await axios.post("/posts/create-post", postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        if (res.data.message === 'Post created successfully') {
            dispatch({ type: "POST_SUCCESS", payload: res.data.post });
            toast.success(`Post created successfully`);
        } else {
            dispatch({ type: "POST_FAILURE", payload: res.data.message });
            toast.error(`Error: ${res.data.message}`);
        }
    } catch (err) {
        dispatch({ type: "POST_FAILURE", payload: err.response?.data?.message || err.message });
        toast.error(`Error: ${err.response?.data?.message || err.message}`);
    }
};

export const callLikePost = async (postId, dispatch) => {
    dispatch({ type: "LIKE_BEGIN" });
    try {
        const res = await axios.post(`/posts/like/${postId}`, {}, { withCredentials: true });
  
        if (res.data.message === 'Post liked/unliked successfully') {
            dispatch({
                type: "LIKE_POST_SUCCESS",
                payload: { postId, likes: res.data.likes },
            });
            toast.success('Updated reaction');
            return res.data;
        } else {
            dispatch({ type: "LIKE_FAILURE", payload: res.data.message });
            toast.error(`Error: ${res.data.message}`);
            return {};
        }
    } catch (err) {
        console.error("Error in callLikePost:", err);
        dispatch({ type: "LIKE_FAILURE", payload: err.response?.data?.message || err.message });
        toast.error(`Error: ${err.response?.data?.message || err.message}`);
        return {};
    }
};

// Call API to hate a post
export const callHatePost = async (postId, dispatch) => {
    dispatch({ type: "HATE_BEGIN" });
    try {
        const res = await axios.post(`/posts/hate/${postId}`, {}, { withCredentials: true });
        console.log("API Response:", res.data);

        if (res.data.message === 'Post hated/neutralized successfully') {
            dispatch({
                type: "HATE_POST_SUCCESS",
                payload: { postId, hates: res.data.hates },
            });
            toast.success('Updated reaction');
            return res.data;
        } else {
            dispatch({ type: "HATE_FAILURE", payload: res.data.message });
            toast.error(`Error: ${res.data.message}`);
            return {};
        }
    } catch (err) {
        console.error("Error in callHatePost:", err);
        dispatch({ type: "HATE_FAILURE", payload: err.response?.data?.message || err.message });
        toast.error(`Error: ${err.response?.data?.message || err.message}`);
        return {};
    }
};

// Call API to get posts
export const callGetPosts = async (dispatch) => {
    dispatch({ type: "FETCH_POSTS_BEGIN" });
    try {
        const res = await axios.get('/posts/get-posts', { withCredentials: true });

        if (res.data.success) {
            dispatch({ type: "FETCH_POSTS_SUCCESS", payload: res.data.posts });
        } else {
            dispatch({ type: "FETCH_POSTS_FAILURE", payload: res.data.message });
            toast.error(`Error: ${res.data.message}`);
        }
    } catch (err) {
        dispatch({ type: "FETCH_POSTS_FAILURE", payload: err.response?.data?.message || err.message });
        toast.error(`Error: ${err.response?.data?.message || err.message}`);
    }
};