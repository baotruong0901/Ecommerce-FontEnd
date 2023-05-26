import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    blog: null,
    blogs: [],
};
export const blogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_BLOG_SUCCESS:
            return {
                ...state,
                blogs: action.payload
            };
        case actionTypes.FETCH_A_BLOG_SUCCESS:
            return {
                ...state,
                blog: action.payload
            };
        case actionTypes.REMOVE_BLOG:
            return {
                ...state,
                blog: {}
            };
        default: return state;
    }
};