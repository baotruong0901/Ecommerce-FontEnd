import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    pCart: [],
};
export const setProductCart = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PRODUCT_IN_CART:
            return {
                ...state,
                pCart: action.payload
            };
        case actionTypes.REMOVE_PRODUCT_IN_CART:
            return {
                ...state,
                pCart: action.payload
            };
        default: return state;
    }
};