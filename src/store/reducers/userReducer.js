
import actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
    account: null,
    isLogin: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: action.payload.data,
                isLogin: true,
            };

        case actionTypes.FETCH_USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: null,
                isLogin: false,
            };

        case actionTypes.FORGOT_PASSWORD:
            return {
                ...state
            };
        case actionTypes.RESET_PASSWORD:
            return {
                ...state
            };

        default: return state;
    }
};

export default userReducer;