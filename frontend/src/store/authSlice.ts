// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    email: string;
    accountType: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions; // Make sure to export these actions
export default authSlice.reducer;
