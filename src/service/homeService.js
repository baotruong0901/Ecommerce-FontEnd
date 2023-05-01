import axios from "../utils/axios"

const getAllCategory = () => {
    return axios.get("api/categorys")
}
const LoginApi = (data) => {
    return axios.post("api/user/login", { ...data })
}
const changePasswordApi = (data) => {
    return axios.put("api/user/change-password", { ...data })
}
const LogoutApi = () => {
    return axios.get("api/user/logout")
}

const getUser = (id) => {
    return axios.get(`api/user/${id}`)
}

const updateUser = (data) => {
    return axios.put(`api/user/edit`, { ...data })
}

const getProductApi = (data, LIMIT, page) => {
    return axios.get(`api/products?${data?.sortCategory ? `category=${data?.sortCategory}&&` : ""}${data?.sortColor ? `color=${data?.sortColor}&&` : ""}${data?.sortSize ? `size=${data?.sortSize}&&` : ""}${data?.sortPrice ? `sort=${data?.sortPrice}&&` : ""}${data?.sortGtePrice ? `price[gte]=${data?.sortGtePrice}&&` : ""}${data?.sortLtePrice ? `price[lte]=${data?.sortLtePrice}&&` : ""}page=${page}&limit=${LIMIT}`)
}
//${data?.sortCategory ? `category=${data?.sortCategory}&` : ""}

const getAProductApi = (limit, page, id) => {
    return axios.get(`api/product/${id}`, { params: { page, limit } })
}

const getCategoryApi = () => {
    return axios.get("api/categorys")
}


const getAllByCategoryApi = (categoryId) => {
    return axios.get(`api/products-by-category/${categoryId}`)
}

const getAllBrandApi = () => {
    return axios.get(`api/brands`)
}

const addProductToWishApi = (data) => {
    return axios.put(`api/wish-list`, { ...data })
}

const getAUser = (userId) => {
    return axios.get(`api/user/${userId}`)
}

const getWishList = () => {
    return axios.get(`api/wishlist`)
}

const deleteProductWishlist = (productId, userId) => {
    return axios.delete(`api/wish-list/${userId}`, { data: { productId } })
}

const putReviewProduct = (data) => {
    return axios.put(`api/product/rating`, { ...data })
}

const getColor = () => {
    return axios.get(`api/colors`)
}

const getSize = () => {
    return axios.get(`api/sizes`)
}

const postAddToCart = (data) => {
    return axios.post(`api/cart`, { ...data })
}

const getProductCart = () => {
    return axios.get(`api/cart`)
}
const putCountProductCart = (data) => {
    return axios.put(`api/cart`, { ...data })
}

const deleteProductInCart = (productId, color, size) => {
    return axios.delete(`api/cart`, { data: { productId, color, size } })
}

const postBooking = (data) => {
    return axios.post('api/booking', { ...data })
}

const emptyCartApi = () => {
    return axios.put('api/carts')
}

const getBooking = (data) => {
    return axios.get(`api/booking?limit=${data.limit}&page=${data.page}&type=${data.type}`)
}

const confirmBookingApi = (bookingId, type) => {
    return axios.put(`api/booking/${bookingId}`, { type })
}


const postForgotPassword = (data) => {
    return axios.post('api/user/forgot-password', { ...data })
}

const putResetPassword = (data, token) => {
    return axios.put(`api/user/reset-password/${token}`, { ...data })
}

//admin

const getAllUser = (type) => {
    return axios.get(`api/get-users`, { params: { type } })
}
const unBlockUser = (userId) => {
    return axios.put(`/api/unblock/${userId}`)
}

const BlockUser = (userId) => {
    return axios.put(`/api/block/${userId}`)
}

const DeleteUser = (userId) => {
    return axios.delete(`/api/${userId}`)
}

const getAllBooking = () => {
    return axios.get(`api/bookings`)
}

const getAllCategories = () => {
    return axios.get('api/categorys')
}

const createAProduct = (title, description, price, brand, color, category, images, quantity) => {
    const data = new FormData()
    data.append('title', title)
    data.append('description', description)
    data.append('price', price)
    data.append('brand', brand)
    data.append('color', color)
    data.append('category', category)
    data.append('quantity', quantity)
    images.forEach((image) => {
        data.append('images', image.originFileObj);
    });
    return axios.post('api/product', data)
}


export {
    getAllCategory,
    LoginApi,
    changePasswordApi,
    getProductApi,
    getCategoryApi,
    getAllByCategoryApi,
    getAllBrandApi,
    getAProductApi,
    addProductToWishApi,
    getAUser,
    deleteProductWishlist,
    putReviewProduct,
    getWishList,
    getUser,
    updateUser,
    LogoutApi,
    getColor,
    getSize,
    postAddToCart,
    getProductCart,
    deleteProductInCart,
    postBooking,
    confirmBookingApi,
    emptyCartApi,
    getBooking,
    postForgotPassword,
    putResetPassword,
    putCountProductCart,
    getAllUser,
    unBlockUser,
    BlockUser,
    DeleteUser, getAllBooking,
    getAllCategories,
    createAProduct,
}