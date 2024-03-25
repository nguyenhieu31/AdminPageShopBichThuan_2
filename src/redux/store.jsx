
import { configureStore } from '@reduxjs/toolkit';

import UserReducer from './user/user';
import OrdersReducer from './order/orderSlice';
import ProductsReducer from './product/productSlice';
import DataTodayReducer from './overview/overviewSlice';
import AuthenticationReducer from './authentication/authentication';

export const store = configureStore({
    reducer: {
        authentication: AuthenticationReducer,
        user: UserReducer,
        products: ProductsReducer,
        orders: OrdersReducer,
        datatoday: DataTodayReducer,
    },
});
