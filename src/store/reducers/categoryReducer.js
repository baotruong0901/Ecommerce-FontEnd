import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    categories: [],
};
export const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        default: return state;
    }
};