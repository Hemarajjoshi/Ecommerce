import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './productSlice';

const persistConfig = {
    key: 'auth',
    storage,
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        products: productReducer,
    }
});

export const persistor = persistStore(store);

export default store;
