// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: { id: string; name: string; email: string } | null;
}

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserProfile: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
            state.user = action.payload;
        },
    },
});

export const { updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
