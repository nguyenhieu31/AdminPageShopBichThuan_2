import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from 'src/utils/axios-util';

export const fetchDataToday = createAsyncThunk(
    'fetchDataToday',
    async () => {
        try {
            const response = await axiosInstance.get('/system/data-today');
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

export const datatodaySilce = createSlice({
    name: 'datatoday',
    initialState: {
        isLoading: false,
        isError: false,
        dataToday: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataToday.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDataToday.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(fetchDataToday.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.dataToday = action.payload;
            });
    }
})

export default datatodaySilce.reducer;