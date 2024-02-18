// import { toast } from "react-toastify";
import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../utils/axios-util';

export const findAllUser = createAsyncThunk('findAllUser', async () => {
  try {
    const res = await axiosInstance.get('/system/user');
    if (res.data) {
      return res.data;
    }
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
});
export const updateStatusOfUser = createAsyncThunk('updateStatusOfUser', async (data) => {
  try {
    const res = await axiosInstance.patch(
      `/system/user/update?status=${data.status}&userId=${data.id}`
    );
    if (res.data) return res.data;
    return res;
  } catch (err) {
    if (err.status === 400) {
      toast.error(err.message);
    }
    throw new Error(err);
  }
});
const initialState = {
  isLoading: false,
  users: [],
  messageUpdateStatus: '',
  error: '',
};
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStateStatusOfUser: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.userId === action.payload.id) {
          user.status = action.payload.status;
          user.updatedBy = action.payload.userName;
        }
        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatusOfUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(updateStatusOfUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messageUpdateStatus = action.payload;
      })
      .addCase(findAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateStatusOfUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { updateStateStatusOfUser } = UserSlice.actions;
export default UserSlice.reducer;
