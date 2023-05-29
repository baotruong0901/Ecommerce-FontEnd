
import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    shippingAddress: null
};
const addressReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_ADDRESS_SHIPPING_SUCCESS:
            return {
                ...state,
                shippingAddress: action.payload
            };

        default: return state;
    }
};

export default addressReducer;