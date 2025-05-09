import { oddsApi } from '@/api/oddsApiService';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // Add cartReducer
    [oddsApi.reducerPath]: oddsApi.reducer, // RTK Query oddsApi
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(oddsApi.middleware),
});

// RootState type for useSelector and state typing
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch type for useDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
