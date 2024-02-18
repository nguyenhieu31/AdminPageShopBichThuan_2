/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";

import UserReducer from './user/user';
import AuthenticationReducer from './authentication/authentication';


export const store= configureStore({
     reducer:{
          authentication: AuthenticationReducer,
          user: UserReducer
     }
});