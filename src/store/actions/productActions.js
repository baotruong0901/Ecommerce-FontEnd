import actionTypes from "./actionTypes";

export const setProducts = (data) => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCT_SUCCESS,
        payload: data
    }
}
export const selectProduct = (data) => {
    return {
        type: actionTypes.FETCH_DETAIL_PRODUCT_SUCCESS,
        payload: data
    }
}

export const removeSelectedProduct = () => {
    return {
        type: actionTypes.REMOVE_SELECTED_PRODUCT,

    }
}

export const setWishList = (data) => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCT_IN_WISHLIST,
        payload: data

    }
}

export const setCart = (data) => {
    return {
        type: actionTypes.FETCH_ALL_PRODUCT_IN_CART,
        payload: data
    }
}

export const removeAProductInCart = (data) => {
    return {
        type: actionTypes.REMOVE_PRODUCT_IN_CART,
        payload: data
    }
}

export const fetchCategoryStart = (data) => {
    return {
        type: actionTypes.FETCH_CATEGORIES,
        payload: data
    }
}

export const setBooking = (data) => {
    return {
        type: actionTypes.FETCH_BOOKING,
        payload: data
    }
}


