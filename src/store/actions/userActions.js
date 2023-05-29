import actionTypes from "./actionTypes";
import { postForgotPassword, putResetPassword, getAnAddress } from "../../service/homeService";
import { toast } from 'react-toastify'

export const login = (data) => {
    return {
        type: actionTypes.FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}
export const logout = () => {
    return {
        type: actionTypes.FETCH_USER_LOGOUT_SUCCESS
    }
}

// export const forgotPassword = (data) => {
//     return {
//         type: actionTypes.RESET_PASSWORD
//     }
// }

export const forgotPasswordStart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FORGOT_PASSWORD });
            let res = await postForgotPassword(data);
            console.log(res);
            if (res && res.success === true) {
                toast.success(res.msg)
            } else {
                toast.error(res.msg)
            }
        } catch (err) {
            console.log("Error", err);
        }
    };
};
export const resetPasswordStart = (data, token) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.RESET_PASSWORD });
            let res = await putResetPassword(data, token);
            if (res && res.success === true) {
                toast.success(res.msg)
            }
        } catch (err) {
            console.log("Error", err);
        }
    };
};

export const addressShipping = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.GET_ADDRESS_SHIPPING });
            let res = await getAnAddress(id);
            if (res && res.success === true) {
                dispatch(addressShippingSucceed(res?.data));
                console.log(res);
            } else {
                dispatch(addressShippingFaild());
            }
        } catch (err) {
            console.log("Error", err);
        }
    };
}

export const addressShippingSucceed = (data) => ({
    type: actionTypes.GET_ADDRESS_SHIPPING_SUCCESS,
    payload: data,
});
export const addressShippingFaild = () => ({
    type: actionTypes.GET_ADDRESS_SHIPPING_FAILED,
});
