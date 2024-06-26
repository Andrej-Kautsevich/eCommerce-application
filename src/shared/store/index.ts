import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import logger from 'redux-logger';
import authSlice from './auth/authSlice';
import productsSlice from './auth/productsSlice';
import customerSlice from './auth/customerSlice';
import cartSlice from './auth/cartSlice';
import localizationSlice from './auth/localizationSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isLoggedIn'],
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'products', 'customer', 'cart', 'localization'],
};

export const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  products: productsSlice,
  customer: customerSlice,
  cart: cartSlice,
  localization: localizationSlice,
});

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

let middlewares: Middleware[] = [];

if (import.meta.env.DEV) middlewares = [logger];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
