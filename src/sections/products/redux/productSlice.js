import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../../utils/axios-util';

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async () => {
        try {
            const response = await axiosInstance.get('/system/products');
            return response;
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 400) {
                toast.error(err.message);
            }
            throw err;
        }
    }
)

// const initialState = {
//     isLoading: false,
//     isError: false,
//     products: null,
// }

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        isError: false,
        listProducts: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.listProducts = action.payload;
            });
    }
})

export default productSlice.reducer;
