import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { productReducer, selectedProduct } from './productReducer';
import { setProductWishList } from './wishListReducer';
import { setProductCart } from './cartReducer';
import { categoryReducer } from './categoryReducer';
import { booking } from './bookingReducer';
const rootReducer = combineReducers({
    user: userReducer,
    AllProducts: productReducer,
    Product: selectedProduct,
    wishList: setProductWishList,
    cart: setProductCart,
    categories: categoryReducer,
    booking: booking
});

export default rootReducer;