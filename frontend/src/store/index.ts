// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import businessReducer from './businessSlice'; // assuming you have this slice
import userReducer from './userSlice'; // assuming you have this slice

const store = configureStore({
    reducer: {
        auth: authReducer,
        business: businessReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
