// src/store/businessSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id?: number;
    name: string;
    price: number;
}

interface Business {
    id: string;
    name: string;
    description: string;
    owner: number;
    products: Product[];
}

interface BusinessState {
    currentBusiness: Business | null;
    businesses: Business[]; // Add this line to manage a list of businesses
}

const initialState: BusinessState = {
    currentBusiness: null,
    businesses: [], // Initialize the list of businesses
};

const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setCurrentBusiness: (state, action: PayloadAction<Business>) => {
            state.currentBusiness = action.payload;
        },
        addBusiness: (state, action: PayloadAction<Business>) => {
            state.businesses.push(action.payload);
        },
        setBusinesses: (state, action: PayloadAction<Business[]>) => { // Add this reducer
            state.businesses = action.payload;
        },
    },
});

export const { setCurrentBusiness, addBusiness, setBusinesses } = businessSlice.actions; // Export setBusinesses
export default businessSlice.reducer;