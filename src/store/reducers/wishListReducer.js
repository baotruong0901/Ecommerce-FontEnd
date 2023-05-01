import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    pWishList: [],
};
export const setProductWishList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PRODUCT_IN_WISHLIST:
            return {
                ...state,
                pWishList: action.payload
            };
        default: return state;
    }
};