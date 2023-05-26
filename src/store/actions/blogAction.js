import actionTypes from "./actionTypes";
import { toast } from 'react-toastify'
import { getABlog, getAllBlog } from "../../service/homeService";
export const fetchAllBlog = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBlog();
            if (res && res?.success === true) {
                dispatch(fetchAllBlogSucceed(res?.data));
            } else {
                dispatch(fetchAllBlogFaild());
            }
        } catch (err) {
            dispatch(fetchAllBlogFaild());
            console.log("fetch All Blog error", err);
        }
    };
}
export const fetchAllBlogSucceed = (data) => ({
    type: actionTypes.FETCH_ALL_BLOG_SUCCESS,
    payload: data,
});
export const fetchAllBlogFaild = () => ({
    type: actionTypes.FETCH_ALL_BLOG_FAILD,
});

export const fetchABlog = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getABlog(id);
            if (res && res?.success === true) {
                dispatch(fetchABlogSucceed(res?.data));
            } else {
                dispatch(fetchABlogFaild());
            }
        } catch (err) {
            dispatch(fetchABlogFaild());
            console.log("fetch A Blog error", err);
        }
    };
}
export const fetchABlogSucceed = (data) => ({
    type: actionTypes.FETCH_A_BLOG_SUCCESS,
    payload: data,
});
export const fetchABlogFaild = () => ({
    type: actionTypes.FETCH_A_BLOG_FAILD,
});

export const removeBlog = () => {
    return {
        type: actionTypes.REMOVE_BLOG,
    }
}


