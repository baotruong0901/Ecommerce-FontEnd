import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import { setCookie } from '../utils/cookie'; // import hàm setCookie để set refreshToken vào cookies
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'user',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
// Lưu refreshToken vào cookies khi đăng nhập thành công
// store.subscribe(() => {
//     const state = store.getState();
//     if (state?.user?.account?.token) {
//         setCookie('refreshToken', state?.user?.account?.token, 3); // Set refreshToken vào cookies với tên là refreshToken và thời gian hết hạn là 7 ngày
//     }
// })
let persistor = persistStore(store)



export { store, persistor }