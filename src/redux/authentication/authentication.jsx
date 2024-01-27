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
               if(res){
                    toast.success("Đăng nhập thành công");
               }
               return data.userName;
          }catch(err){
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
const initialState={
     isLogined: false,
     isLoading: false,
     isLoadingStateLogin: false,
     userName: '',
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
               });
     }
});
export default AuthenticationSlice.reducer;