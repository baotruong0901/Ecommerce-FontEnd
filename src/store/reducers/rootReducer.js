import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { productReducer, selectedProduct } from './productReducer';
import { setProductWishList } from './wishListReducer';
import { setProductCart } from './cartReducer';
import { categoryReducer } from './categoryReducer';
import { booking } from './bookingReducer';
import { blogReducer } from './blogReducer';
import addressReducer from './addressReducer';
const rootReducer = combineReducers({
    user: userReducer,
    AllProducts: productReducer,
    Product: selectedProduct,
    wishList: setProductWishList,
    cart: setProductCart,
    categories: categoryReducer,
    booking: booking,
    blogs: blogReducer,
    address: addressReducer
});

export default rootReducer;