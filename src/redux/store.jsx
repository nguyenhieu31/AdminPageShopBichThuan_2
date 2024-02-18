/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './user/user';
import OrdersReducer from './order/orderSlice';
import AuthenticationReducer from './authentication/authentication';
import ProductsReducer from '../sections/products/redux/productSlice';

export const store = configureStore({
  reducer: {
    authentication: AuthenticationReducer,
    user: UserReducer,
    products: ProductsReducer,
    orders: OrdersReducer,
  },
});
