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

let persistor = persistStore(store)



export { store, persistor }