/* eslint-disable import/no-extraneous-dependencies */
import { toast } from "react-toastify";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import {axiosInstance} from '../../utils/axios-util';

export const checkStateLogin= createAsyncThunk(
     'checkStateLogin',
     async ()=>{
          try{
               const res= await axiosInstance.get('/auth/checkStateLogin');
               if(res.data){
                    return res.data;
               }
               return res;
          }catch(err){
               if(err.status===401){
                    toast.error(err.message);
               }
               throw new Error(err);
          }
     }
);
export const login=createAsyncThunk(
     'login',
     async (data)=>{
          try{
               const res= await axiosInstance.post("/auth/login", data);
               const checkPermissionAccount= await axiosInstance.get('/system/permission-page');
               if(res && checkPermissionAccount){
                    toast.success("Đăng nhập thành công");
                    return data.userName;
               }
               throw new Error("error when logined");
               
          }catch(err){
               if(err.status===401){
                    toast.error('Tài khoản của bạn không  có quyền truy cập vào trang web này, vui lòng liên hệ với admin để có thể giải quyết!')
               }
               if(err.status===400){
                    toast.error("Tài khoản hoặc mật khẩu không chính xác!");
               }
               throw new Error(err);
          }
     }
)
export const logout= createAsyncThunk(
     'logout',
     async ()=>{
          try{
               const res= await axiosInstance.get("/auth/logout");
               if(res.data){
                    return res.data;
               }
               return res;
          }catch(err){
               throw new Error(err);
          }
     }
)
export const checkPermissionAccessPage= createAsyncThunk(
     'checkPermissionAccessPage',
     async ()=>{
          try{
               const res= await axiosInstance.get('/system/permission-page');
               if(res.data){
                    return res.data;
               }
               return res;
          }catch(err){
               throw new Error(err.message);
          }
     }
)
const initialState={
     isLogined: false,
     isLoading: false,
     isLoadingStateLogin: false,
     userName: '',
     messagePermission: '',
     errorMessage: ''
}
const AuthenticationSlice= createSlice({
     name: 'authentication',
     initialState,
     reducers: {

     },
     extraReducers: (builder)=>{
          builder
               .addCase(checkStateLogin.pending,(state)=>{
                    state.isLoadingStateLogin=true;
                    state.isLogined=false;
               })
               .addCase(login.pending,(state)=>{
                    state.isLoading=true;
                    state.isLogined=false;
               })
               .addCase(logout.pending,(state)=>{
                    state.isLoading=true;
               })
               .addCase(checkPermissionAccessPage.pending,(state)=>{
                    state.isLoading=true;
               })
               .addCase(checkStateLogin.fulfilled,(state,action)=>{
                    state.isLoadingStateLogin=false;
                    state.isLogined=true;
                    state.userName=action.payload;
               })
               .addCase(login.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isLogined=true;
                    state.userName=action.payload;
               })
               .addCase(logout.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isLogined=false;
                    state.userName='';
               })
               .addCase(checkPermissionAccessPage.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.messagePermission=action.payload;
               })
               .addCase(checkStateLogin.rejected,(state,action)=>{
                    state.isLoadingStateLogin=false;
                    state.isLogined=false;
                    state.userName='';
                    state.errorMessage=action.error.message;
               })
               .addCase(login.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isLogined=false;
                    state.userName='';
                    state.errorMessage=action.error.message;
               })
               .addCase(logout.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isLogined=false;
                    state.userName='';
                    state.errorMessage=action.error.message;
               })
               .addCase(checkPermissionAccessPage.rejected,(state,action)=>{
                    state.isLoading=false;
                    state.isLogined=false;
                    state.userName='';
                    state.error= action.error.message;
               });
     }
});
export default AuthenticationSlice.reducer;