import { configureStore } from "@reduxjs/toolkit";

import OrdersReducer from "../sections/order/redux/orderSlice"
import ProductsReducer from "../sections/products/redux/productSlice"

export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        orders: OrdersReducer,
    }
});