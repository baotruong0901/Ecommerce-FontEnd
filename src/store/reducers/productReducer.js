
import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    products: null,
};
export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload
            };
        default: return state;
    }
};

export const selectedProduct = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DETAIL_PRODUCT_SUCCESS:
            return {
                ...state, ...action.payload
            };
        case actionTypes.REMOVE_SELECTED_PRODUCT:
            return {};

        default: return state;
    }
};
