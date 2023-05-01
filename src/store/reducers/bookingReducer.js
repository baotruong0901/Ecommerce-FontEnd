import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    booking: [],
};
export const booking = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BOOKING:
            return {
                ...state,
                booking: action.payload
            };
        // case actionTypes.REMOVE_PRODUCT_IN_CART:
        //     return {
        //         ...state,
        //         pCart: action.payload
        //     };
        default: return state;
    }
};