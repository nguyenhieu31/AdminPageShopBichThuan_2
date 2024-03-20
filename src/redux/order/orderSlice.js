import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "src/utils/axios-util";

export const fetchDataOrders = createAsyncThunk(
    'fetchDataOrders',
    async (path) => {
        try {
            const response = await axiosInstance.get(`/system/${path}`);
            return response;
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 400) {
                toast.error("Không thể tải Đơn Hàng !!!");
            }
            throw err;
        }
    }
);
export const getDataByStatusOrder= createAsyncThunk(
    'getDataByStatusOrder',
    async (statusOrder) => {
        try {
            const response = await axiosInstance.get(`/system/order/status/${statusOrder}`);
            return response;
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 400) {
                toast.error("Không thể tải Đơn Hàng!!!");
            }
            throw err;
        }
    }
)
export const updatedOrderById = createAsyncThunk(
    'updatedOrderById',
    async ({ orderId, orderDTO }) => {
        try {
            const response = await axiosInstance.put(`/system/edit-order/${orderId}`, orderDTO);
            return response.status;
        } catch (err) {
            console.error(err);
            if (err.response) {
                toast.error("Không thể cập nhật Đơn Hàng này. Vui lòng thử lại !!!");
            }
            throw err;
        }
    }
);
export const handleOrder= createAsyncThunk(
    'handleOrder',
    async (values) => {
        try {
            const response = await axiosInstance.put(`/system/order/handle-order`, values);
            if(response){
                toast.success(response);
            }
            return response;
        } catch (err) {
            console.error(err);
            if (err.response) {
                toast.error("Không thể cập nhật Đơn Hàng này. Vui lòng thử lại!!!");
            }
            throw err;
        }
    }
)
export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        isLoading: false,
        isError: false,
        listOrders: [],
        status: null,
    },
    reducers: {
        updateStatusOrder: (state,action)=>{
            if(!state.isError){
                state.listOrders= state.listOrders.filter(order=>order.orderCode!==action.payload);
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDataByStatusOrder.pending, (state) => {
                state.isLoading = true;
                state.listOrders=[]
            })
            .addCase(updatedOrderById.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(handleOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDataOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listOrders = action.payload;
            })
            .addCase(updatedOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.status = action.payload;
            })
            .addCase(getDataByStatusOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listOrders = action.payload;
            })
            .addCase(handleOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(updatedOrderById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(fetchDataOrders.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getDataByStatusOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(handleOrder.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
})
export const {updateStatusOrder}= orderSlice.actions;
export default orderSlice.reducer;